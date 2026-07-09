<script setup>
import { useTheme } from '@/composables/useTheme'

defineProps({
  title: { type: String, required: true },
  icon: { type: [Object, Function], required: true },
  periodLabel: { type: String, required: true },
  compareLabel: { type: String, required: true },
  groups: { type: Array, required: true },
  grandTotal: { type: Object, required: true },
})

const { isDark } = useTheme()

function formatAmount(value) {
  return `${value < 0 ? '-' : ''}Rp ${Math.abs(value).toLocaleString('id-ID')}`
}
function formatPercent(value) {
  return `${value >= 0 ? '+' : ''}${value}%`
}
</script>

<template>
  <div class="rounded-2xl border" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="flex items-center gap-2.5 p-5">
      <div class="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center flex-shrink-0">
        <component :is="icon" class="w-4 h-4 text-purple-400" />
      </div>
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">{{ title }}</p>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-t" :class="isDark ? 'border-white/5' : 'border-gray-100'">
            <th class="text-left px-5 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Akun</th>
            <th class="text-right px-3 py-3 font-medium whitespace-nowrap" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ periodLabel }}</th>
            <th class="text-right px-3 py-3 font-medium whitespace-nowrap" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ compareLabel }}</th>
            <th class="text-right px-5 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Perubahan</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="group in groups" :key="group.key">
            <tr class="border-t" :class="isDark ? 'border-white/5' : 'border-gray-100'">
              <td class="px-5 py-3 font-semibold whitespace-nowrap" :class="isDark ? 'text-white' : 'text-gray-900'">{{ group.label }}</td>
              <td class="px-3 py-3 text-right font-semibold whitespace-nowrap" :class="isDark ? 'text-white' : 'text-gray-900'">{{ formatAmount(group.total.current) }}</td>
              <td class="px-3 py-3 text-right whitespace-nowrap" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ formatAmount(group.total.previous) }}</td>
              <td class="px-5 py-3 text-right whitespace-nowrap" :class="group.total.change >= 0 ? 'text-emerald-400' : 'text-rose-400'">{{ formatPercent(group.total.changePercent) }}</td>
            </tr>

            <tr
              v-for="item in group.items"
              :key="item.label"
              class="border-t transition"
              :class="isDark ? 'border-white/5 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'"
            >
              <td class="px-5 py-3 pl-8" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ item.label }}</td>
              <td class="px-3 py-3 text-right whitespace-nowrap" :class="item.current < 0 ? 'text-rose-400' : (isDark ? 'text-gray-300' : 'text-gray-700')">{{ formatAmount(item.current) }}</td>
              <td class="px-3 py-3 text-right whitespace-nowrap" :class="item.previous < 0 ? 'text-rose-400' : (isDark ? 'text-gray-500' : 'text-gray-400')">{{ formatAmount(item.previous) }}</td>
              <td class="px-5 py-3 text-right whitespace-nowrap" :class="item.change >= 0 ? 'text-emerald-400' : 'text-rose-400'">{{ formatPercent(item.changePercent) }}</td>
            </tr>
          </template>

          <tr class="border-t-2" :class="isDark ? 'border-purple-500/30 bg-purple-500/10' : 'border-purple-300 bg-purple-50'">
            <td class="px-5 py-3.5 font-bold whitespace-nowrap text-purple-400">{{ grandTotal.label }}</td>
            <td class="px-3 py-3.5 text-right font-bold whitespace-nowrap text-purple-400">{{ formatAmount(grandTotal.current) }}</td>
            <td class="px-3 py-3.5 text-right font-medium whitespace-nowrap text-purple-300">{{ formatAmount(grandTotal.previous) }}</td>
            <td class="px-5 py-3.5 text-right font-medium whitespace-nowrap" :class="grandTotal.change >= 0 ? 'text-emerald-400' : 'text-rose-400'">{{ formatPercent(grandTotal.changePercent) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>