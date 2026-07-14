<script setup>
import ScheduledTransferList from '@/components/Transfer/ScheduledTransferList.vue'
import { useScheduledTransferData } from '@/composables/useScheduledTransferData'

const { summaryCards, scheduledTransfers } = useScheduledTransferData()

function handleCreate() {
  // TODO: buka form/modal buat transfer terjadwal baru
  console.log('Buat transfer terjadwal baru')
}
</script>

<template>
  <ScheduledTransferList
    :summary-cards="summaryCards"
    :transfers="scheduledTransfers"
    @create="handleCreate"
  />
</template>