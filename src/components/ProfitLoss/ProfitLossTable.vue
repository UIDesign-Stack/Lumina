<script setup>
import { ref } from 'vue'
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

defineProps({
  periodLabel: { type: String, required: true },
  compareLabel: { type: String, required: true },
  sections: { type: Array, required: true },
  subtotals: { type: Array, required: true },
  netProfit: { type: Object, required: true },
})

const { isDark } = useTheme()

const expandedSections = ref(new Set())

function toggleSection(key) {
  if (expandedSections.value.has(key)) {
    expandedSections.value.delete(key)
  } else {
    expandedSections.value.add(key)
  }
}
function isExpanded(key) {
  return !expandedSections.value.has(`collapsed:${key}`)
}
function toggle(key) {
  const marker = `collapsed:${key}`
  if (expandedSections.value.has(marker)) {
    expandedSections.value.delete(marker)
  } else {
    expandedSections.value.add(marker)
  }
}

function formatAmount(value) {
  return `Rp ${value.toLocaleString('id-ID')}`
}
function formatChange(value) {
  return `${value >= 0 ? '+' : '-'}Rp ${Math.abs(value).toLocaleString('id-ID')}`
}
function formatPercent(value) {
  return `${value >= 0 ? '+' : ''}${value}%`
}
</script>

<template>
  <div class="rounded-2xl border" :class="isDark ? 'bg-[#100c1c]/80 border-white/10' : 'bg-white border-gray-200'">
    <div class="p-5">
      <p class="text-base font-semibold" :class="isDark ? 'text-white' : 'text-gray-900'">Rincian Laba Rugi</p>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-t" :class="isDark ? 'border-white/5' : 'border-gray-100'">
            <th class="text-left px-5 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Keterangan</th>
            <th class="text-right px-3 py-3 font-medium whitespace-nowrap" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ periodLabel }}</th>
            <th class="text-right px-3 py-3 font-medium whitespace-nowrap" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ compareLabel }}</th>
            <th class="text-right px-3 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Perubahan</th>
            <th class="text-right px-5 py-3 font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">% Perubahan</th>
          </tr>
        </thead>
        <tbody>

          <template v-for="section in sections" :key="section.key">
            <tr
              class="border-t cursor-pointer transition"
              :class="isDark ? 'border-white/5 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'"
              @click="toggle(section.key)"
            >
              <td class="px-5 py-3 font-semibold whitespace-nowrap" :class="isDark ? 'text-white' : 'text-gray-900'">
                <span class="inline-flex items-center gap-1.5">
                  <ChevronDownIcon v-if="isExpanded(section.key)" class="w-4 h-4 text-gray-500" />
                  <ChevronRightIcon v-else class="w-4 h-4 text-gray-500" />
                  {{ section.label }}
                </span>
              </td>
              <td class="px-3 py-3 text-right font-semibold whitespace-nowrap" :class="isDark ? 'text-white' : 'text-gray-900'">{{ formatAmount(section.total.current) }}</td>
              <td class="px-3 py-3 text-right whitespace-nowrap" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ formatAmount(section.total.previous) }}</td>
              <td class="px-3 py-3 text-right whitespace-nowrap" :class="section.total.change >= 0 ? 'text-emerald-400' : 'text-rose-400'">{{ formatChange(section.total.change) }}</td>
              <td class="px-5 py-3 text-right whitespace-nowrap" :class="section.total.change >= 0 ? 'text-emerald-400' : 'text-rose-400'">{{ formatPercent(section.total.changePercent) }}</td>
            </tr>

            <tr
              v-for="item in (isExpanded(section.key) ? section.items : [])"
              :key="item.label"
              class="border-t transition"
              :class="isDark ? 'border-white/5 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'"
            >
              <td class="px-5 py-3 pl-11 whitespace-nowrap" :class="isDark ? 'text-gray-300' : 'text-gray-600'">{{ item.label }}</td>
              <td class="px-3 py-3 text-right whitespace-nowrap" :class="isDark ? 'text-gray-300' : 'text-gray-700'">{{ formatAmount(item.current) }}</td>
              <td class="px-3 py-3 text-right whitespace-nowrap" :class="isDark ? 'text-gray-500' : 'text-gray-400'">{{ formatAmount(item.previous) }}</td>
              <td class="px-3 py-3 text-right whitespace-nowrap" :class="item.change >= 0 ? 'text-emerald-400' : 'text-rose-400'">{{ formatChange(item.change) }}</td>
              <td class="px-5 py-3 text-right whitespace-nowrap" :class="item.change >= 0 ? 'text-emerald-400' : 'text-rose-400'">{{ formatPercent(item.changePercent) }}</td>
            </tr>
          </template>

          <tr
            v-for="sub in subtotals"
            :key="sub.label"
            class="border-t transition"
            :class="isDark ? 'border-white/10 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'"
          >
            <td class="px-5 py-3 font-semibold whitespace-nowrap" :class="isDark ? 'text-white' : 'text-gray-900'">
              <span class="inline-flex items-center gap-1.5">
                {{ sub.label }}
                <ChevronRightIcon v-if="sub.hasDetail" class="w-3.5 h-3.5 text-gray-500" />
              </span>
            </td>
            <td class="px-3 py-3 text-right font-semibold whitespace-nowrap" :class="isDark ? 'text-white' : 'text-gray-900'">{{ formatAmount(sub.current) }}</td>
            <td class="px-3 py-3 text-right whitespace-nowrap" :class="isDark ? 'text-gray-400' : 'text-gray-500'">{{ formatAmount(sub.previous) }}</td>
            <td class="px-3 py-3 text-right whitespace-nowrap" :class="sub.change >= 0 ? 'text-emerald-400' : 'text-rose-400'">{{ formatChange(sub.change) }}</td>
            <td class="px-5 py-3 text-right whitespace-nowrap" :class="sub.change >= 0 ? 'text-emerald-400' : 'text-rose-400'">{{ formatPercent(sub.changePercent) }}</td>
          </tr>

          <tr class="border-t-2" :class="isDark ? 'border-purple-500/30 bg-purple-500/10' : 'border-purple-300 bg-purple-50'">
            <td class="px-5 py-3.5 font-bold whitespace-nowrap text-purple-400">{{ netProfit.label }}</td>
            <td class="px-3 py-3.5 text-right font-bold whitespace-nowrap text-purple-400">{{ formatAmount(netProfit.current) }}</td>
            <td class="px-3 py-3.5 text-right font-medium whitespace-nowrap text-purple-300">{{ formatAmount(netProfit.previous) }}</td>
            <td class="px-3 py-3.5 text-right font-medium whitespace-nowrap" :class="netProfit.change >= 0 ? 'text-emerald-400' : 'text-rose-400'">{{ formatChange(netProfit.change) }}</td>
            <td class="px-5 py-3.5 text-right font-medium whitespace-nowrap" :class="netProfit.change >= 0 ? 'text-emerald-400' : 'text-rose-400'">{{ formatPercent(netProfit.changePercent) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>