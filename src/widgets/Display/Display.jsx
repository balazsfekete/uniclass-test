import styles from './Display.module.css'
import { createSignal, createEffect, Show, onMount, onCleanup } from 'solid-js'

const options = {
  // root: document.querySelector("#scrollArea"),
  rootMargin: '0px',
  threshold: 1.0,
}

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.dispatchEvent(new CustomEvent('visible'))
    }
    // Each entry describes an intersection change for one observed
    // target element:
    //   entry.boundingClientRect
    //   entry.intersectionRatio
    //   entry.intersectionRect
    //   entry.isIntersecting
    //   entry.rootBounds
    //   entry.target
    //   entry.time
  })
}

const intersectionObserver = new IntersectionObserver(callback, options)

function Display(props) {
  return <Children children={props.node.resultChildren.get()} query={props.query} />
}

export default Display

function Children(props) {
  return (
    <div class={styles.children}>
      <For each={props.children}>{(child) => <Node node={child} query={props.query} />}</For>
    </div>
  )
}

function Node(props) {
  const [open, setOpen] = createSignal(true)
  const toggleOpen = () => setOpen((b) => !b)

  const [isVisible, setIsVisible] = createSignal(false)
  let node

  const handleRef = (ref) => {
    intersectionObserver.observe(ref)
    onCleanup(() => intersectionObserver.unobserve(ref))
  }

  return (
    <Show
      when={props.node.resultChildren.get().length > 0}
      fallback={
        <div class={styles.node}>
          <div class={styles.header}>
            <div>{props.node.subId}</div>
            <div>
              {/* <Highlight text={props.node.name} occurances={getOccurances(props.node.name, props.query)} /> */}
              {props.node.name}
            </div>
            <div>{props.node.fullId}</div>
          </div>
        </div>
      }
    >
      <div
        class={styles.node}
        classList={{
          [styles.nodeOpen]: open(),
        }}
        ref={handleRef}
        on:visible={() => setIsVisible(true)}
      >
        <div
          class={styles.header}
          classList={{
            [styles.headerHasChildren]: props.node.resultChildren.get().length > 0,
          }}
          onClick={toggleOpen}
        >
          <div>{props.node.subId}</div>
          {/* <div>{props.node.name}</div> */}
          <div>
            {/* <Highlight text={props.node.name} occurances={getOccurances(props.node.name, props.query)} /> */}
            {props.node.name}
          </div>
          <div>{props.node.fullId}</div>
        </div>

        <Show when={isVisible()}>
          <div class={styles.details} classList={{ [styles.open]: open() }}>
            <div class={styles.braceLine} onClick={toggleOpen}></div>

            {/* <div class={styles.children}>
              <For each={props.node.children}>{(child) => <Node node={child} query={props.query} />}</For>
            </div> */}
            <Children children={props.node.resultChildren.get()} query={props.query} />
          </div>
        </Show>
      </div>
    </Show>
  )
}

// const getOccurances = (string, subString) => [...string.matchAll(new RegExp(subString, 'gi')).map((result) => ({ from: result.index, to: result.index + subString.length }))]

// function Highlight(props) {
//   const segmentString = (string, ranges) => {
//     const subStrings = []
//     let from = 0

//     ranges.forEach((range) => {
//       subStrings.push(string.slice(from, range.from))
//       subStrings.push(string.slice(range.from, range.to))
//       from = range.to
//     })

//     subStrings.push(string.slice(from))

//     return subStrings
//   }
//   return (
//     <>
//       <For each={segmentString(props.text, props.occurances)}>
//         {(subString, index) => (
//           <Show when={index() % 2} fallback={subString}>
//             <mark>{subString}</mark>
//           </Show>
//         )}
//       </For>
//     </>
//   )
// }
