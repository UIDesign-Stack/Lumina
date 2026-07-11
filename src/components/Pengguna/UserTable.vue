<script setup>
import { computed } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import UserTableRow from './UserTableRow.vue'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  users: { type: Array, required: true },
  currentPage: { type: Number, default: 1 },
  perPage: { type: Number, default: 8 },
})

const emit = defineEmits(['update:currentPage', 'row-menu'])

const { isDark } = useTheme()

const totalPages = computed(() => Math.max(1, Math.ceil(props.users.length / props.perPage)))

const pagedUsers = computed(() => {
  const start = (props.currentPage - 1) * props.perPage
  return props.users.slice(start, start + props.perPage)
})

const rangeLabel = computed(() => {
  if (props.users.length === 0) return 'Menampilkan 0 dari 0 data'
  const start = (props.currentPage - 1) * props.perPage + 1
  const end = Math.min(props.currentPage * props.perPage, props.users.length)
  return `Menampilkan ${start} - ${end} dari ${props.users.length} data`
})

function goTo(page) {
  if (page < 1 || page > totalPages.value) return
  emit('update:currentPage', page)
}

const headers = ['Pengguna', 'Peran', 'Departemen', 'Status', 'Terakhir Aktif', 'Aksi']
</script>

<template>
  <div class="rounded-2xl border overflow-hidden" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="overflow-x-auto">
      <table class="w-full min-w-[720px]">
        <thead>
          <tr class="border-b" :class="isDark ? 'border-white/10' : 'border-gray-100'">
            <th
              v-for="(header, i) in headers"
              :key="header"
              class="py-3 px-4 text-left text-xs font-medium uppercase tracking-wide"
              :class="[isDark ? 'text-gray-400' : 'text-gray-500', i === 0 ? 'pl-5' : '', header === 'Aksi' ? 'text-right pr-5' : '']"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <UserTableRow
            v-for="user in pagedUsers"
            :key="user.key"
            :user="user"
            class="[&>td:first-child]:pl-5 [&>td:last-child]:pr-5"
            @menu="$emit('row-menu', $event)"
          />
        </tbody>
      </table>
    </div>

    <div class="flex items-center justify-between px-5 py-4 border-t" :class="isDark ? 'border-white/10' : 'border-gray-100'">
      <p class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ rangeLabel }}</p>

      <div class="flex items-center gap-1.5">
        <button
          type="button"
          class="w-8 h-8 rounded-lg border flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed"
          :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'"
          :disabled="currentPage === 1"
          @click="goTo(currentPage - 1)"
        >
          <ChevronLeftIcon class="w-4 h-4" />
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          type="button"
          class="w-8 h-8 rounded-lg text-sm font-medium transition"
          :class="page === currentPage
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
            : (isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-50')"
          @click="goTo(page)"
        >
          {{ page }}
        </button>

        <button
          type="button"
          class="w-8 h-8 rounded-lg border flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed"
          :class="isDark ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'"
          :disabled="currentPage === totalPages"
          @click="goTo(currentPage + 1)"
        >
          <ChevronRightIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>