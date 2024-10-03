import { createSignal, createEffect, Show } from 'solid-js'
import styles from './App.module.css'
import data from './data.txt'

import Display from '@/widgets/Display'

function App() {
  const createNode = (fullId, subId, name) => ({
    fullId,
    subId,
    name,
    lowerCaseName: name.toLowerCase(),
    lowerCaseFullId: fullId.toLowerCase(),
    result: {
      name: false,
      fullId: false,
    },
    resultChildren: [],
    children: [],
  })

  const [root, setRoot] = createSignal(createNode('', '', ''))

  const fileNode = (node, fullId, subIds, name) => {
    if (subIds.length === 1) {
      node.children.push(createNode(fullId, subIds[0], name))
    } else {
      const subId = subIds.shift()
      const child = node.children.find((child) => child.subId === subId)
      fileNode(child, fullId, subIds, name)
    }
  }

  fetch(data)
    .then((r) => r.text())
    .then((t) => {
      const root = createNode('', '', '')
      t.split(/\r?\n/).forEach((line) => {
        const [fullId, name] = line.split(/ (.*)/)
        fileNode(root, fullId, fullId.split('_'), name)
      })
      setRoot(root)
    })

  const [searchQuery, setSearchQuery] = createSignal('Project man')

  const search = (node, searchTerms) => {
    node.result.name = searchTerms.every((searchTerm) => node.lowerCaseName.indexOf(searchTerm) != -1)

    node.result.fullId = searchTerms.every((searchTerm) => node.lowerCaseFullId.indexOf(searchTerm) != -1)

    node.resultChildren = node.children.filter((child) => {
      search(child, searchTerms)
      return child.result.name || child.result.fullId || child.resultChildren.length > 0
    })
  }

  const result = () => {
    const node = root()
    const searchTerms = searchQuery().toLowerCase().split(' ')
    search(node, searchTerms)
    return node
  }

  createEffect(() => {
    console.log(result())
  })

  return (
    <div class={styles.app}>
      <input class={styles.searchBar} placeholder='Search' value={searchQuery()} oninput={(e) => setSearchQuery(e.target.value)} />
      <Display node={result()} query={searchQuery()} />
    </div>
  )
}

export default App

// const getOccurances = (string, subString) => [...string.matchAll(new RegExp(subString, '')).map((result) => ({ from: result.index, to: result.index + subString.length }))]

// const find = (node, query) => {
//   const occurances = getOccurances(node.name, query)

//   const children = []

//   node.children?.forEach((child) => {
//     const result = find(child, query)
//     if (result) {
//       children.push(result)
//     }
//   })

//   if (occurances.length > 0 || children.length > 0)
//     return {
//       node,
//       occurances,
//       children,
//     }
// }

// const isResult = (node, regex) => node.name.search(regex) != -1 && node.fullId.search(regex)
