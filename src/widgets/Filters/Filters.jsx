import styles from './Filters.module.css'
import { createSignal, createEffect, Show, onMount, onCleanup } from 'solid-js'

function Filters(props) {
  return (
    <div class={styles.filters}>
      <For each={props.node.children}>
        {(item) => (
          <button class={styles.chips}>
            <div>{item.subId}</div>
            <div>{item.name}</div>
          </button>
        )}
      </For>
      <button class={styles.button}>Select all</button>
      <button class={styles.button}>Deselect all</button>
    </div>
  )
}

export default Filters
