import { defineComponent, onMounted, ref } from 'vue'
import Sortable from 'sortablejs'
import pause from 'delay'

export default defineComponent({
  setup() {
    const table = ref({
      ref: null,
      data: [
        {
          date: '2016-05-03',
          name: 'A',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'B',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'C',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'D',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
    })

    onMounted(() => {
      const tbody = table.value.ref.$el.querySelector('tbody')

      Sortable.create(tbody, {
        async onEnd({ newIndex, oldIndex }) {
          await pause(2000)

          const [row] = table.value.data.splice(oldIndex, 1)

          table.value.data.splice(newIndex, 0, row)

          console.log(table.value.data)
        },
      })
    })

    return () => (
      <ElTable
        ref={el => (table.value.ref = el)}
        data={table.value.data}
        rowKey='name'
      >
        <ElTableColumn prop='date' label='Date' width='180' />
        <ElTableColumn prop='name' label='Name' width='180' />
        <ElTableColumn prop='address' label='Address' />
      </ElTable>
    )
  },
})
