import { createSignal, createEffect, Show } from 'solid-js'

import styles from './App.module.css'
import data from './data.txt'

import { createSignalObject } from '@/dataTypes'
import Display from '@/widgets/Display'
import Filters from '@/widgets/Filters'

function App() {
  const createNode = (fullId, subId, name) => ({
    fullId,
    subId,
    name,
    lowerCaseName: name.toLowerCase(),
    lowerCaseFullId: fullId.toLowerCase(),
    isResult: createSignalObject(false),
    resultChildren: createSignalObject([]),
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

  const [searchQuery, setSearchQuery] = createSignal('Project')

  createEffect(() => {
    const node = root()
    const searchTerms = searchQuery().toLowerCase().split(' ')

    const search = (node) => {
      const isResult = searchTerms.every((searchTerm) => node.lowerCaseName.indexOf(searchTerm) != -1 || node.lowerCaseFullId.indexOf(searchTerm) != -1)

      node.isResult.set(isResult)

      const resultChildren = []

      node.children?.forEach((child) => {
        const result = search(child)
        if (result) {
          resultChildren.push(child)
        }
      })

      node.resultChildren.set(resultChildren)

      if (isResult || resultChildren.length > 0) return true
    }

    search(node)
  })

  return (
    <div class={styles.app}>
      <header>
        <h1>Uniclass Browser</h1>
        <input class={styles.searchBar} placeholder='Search' value={searchQuery()} oninput={(e) => setSearchQuery(e.target.value)} />
        <Filters node={root()} />
      </header>
      <main>
        <Display node={root()} query={searchQuery()} />
      </main>
      <footer>
        Tables updated on 20 September 2024
        <br />
        <a href='https://uniclass.thenbs.com/'>Uniclass by NBS</a> licensed under&nbsp;
        <a href='https://creativecommons.org/licenses/by-nd/4.0/'>CC BY-ND 4.0</a>
        <br />
        Rendition by Balázs Fekete licensed under&nbsp;
        <a href='https://creativecommons.org/licenses/by-sa/4.0/'>CC BY-SA 4.0</a>
      </footer>
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
