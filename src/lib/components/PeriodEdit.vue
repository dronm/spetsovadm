<template>
  <div class="control-container" :title="title">
    <label v-if="props.label" for="period" class="control-label">
      {{ props.label }}
    </label>

    <div class="edit-container">
      <button
        type="button"
        @click="previousPeriod"
        class="px-3 py-1 border border-gray-300 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        :title="
          props.dateType === PeriodDateType.MONTH
            ? $t('PeriodEdit.prevMonth')
            : props.dateType === PeriodDateType.YEAR
              ? $t('PeriodEdit.prevYear')
              : $t('PeriodEdit.prevDay')
        "
      >
        &lt;
      </button>

      <div class="relative">
        <span
          @click="openDatePicker"
          class="inline-block px-3 py-1 min-w-[120px] text-center cursor-pointer hover:bg-gray-50 rounded-md"
        >
          {{ displayedPeriod }}
        </span>
        <input
          id="period"
          :type="props.dateType === PeriodDateType.DAY ? 'date' : props.dateType === PeriodDateType.MONTH ? 'month' : 'text'"
          ref="dateInput"
          :value="inputValue"
          class="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
          @change="handlePeriodChange"
        />
      </div>

      <button
        type="button"
        @click="nextPeriod"
        class="px-3 py-1 border border-gray-300 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        :title="
          props.dateType === PeriodDateType.MONTH
            ? $t('PeriodEdit.nextMonth')
            : props.dateType === PeriodDateType.YEAR
              ? $t('PeriodEdit.nextYear')
              : $t('PeriodEdit.nextDay')
        "
      >
        &gt;
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from "vue";

import { PeriodDateType } from "../types/periodDateType";

const props = defineProps<{
	label?: string;
	title?: string;
	modelValue: Date;
	dateType: PeriodDateType;
}>();

const emit = defineEmits<{
	(e: "update:modelValue", value: Date): void;
}>();

const dateInput = ref<HTMLInputElement | null>(null);

// Neutral date (not just month-based)
const currentDate = ref(new Date(props.modelValue));

// Watch for external modelValue changes
watch(
	() => props.modelValue,
	(newValue) => {
		const newDate = new Date(newValue);
		if (newDate.getTime() !== currentDate.value.getTime()) {
			currentDate.value = newDate;
		}
	},
	{ immediate: true }
);

// Emit correct date depending on type
const emitValue = () => {
	const date = new Date(currentDate.value);
	if (props.dateType === PeriodDateType.DAY) {
		emit("update:modelValue", date);
	} else if (props.dateType === PeriodDateType.MONTH) {
		emit("update:modelValue", new Date(date.getFullYear(), date.getMonth(), 1));
	} else {
		emit("update:modelValue", new Date(date.getFullYear(), 0, 1));
	}
};

// Display value for input
const inputValue = computed(() => {
	const year = currentDate.value.getFullYear();
	const month = String(currentDate.value.getMonth() + 1).padStart(2, "0");
	const day = String(currentDate.value.getDate()).padStart(2, "0");

	if (props.dateType === PeriodDateType.DAY) {
		return `${year}-${month}-${day}`;
	} else if (props.dateType === PeriodDateType.MONTH) {
		return `${year}-${month}`;
	} else {
		return `${year}`;
	}
});

// Displayed text for selected period
const displayedPeriod = computed(() => {
	if (props.dateType === PeriodDateType.DAY) {
		return currentDate.value.toLocaleDateString(undefined, {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	} else if (props.dateType === PeriodDateType.MONTH) {
		return currentDate.value.toLocaleDateString(undefined, {
			year: "numeric",
			month: "long",
		});
	} else {
		return currentDate.value.getFullYear().toString();
	}
});

// Handle change from native input
const handlePeriodChange = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (!target.value) return;

	const [yearStr, monthStr, dayStr] = target.value.split("-");
	const year = Number(yearStr);
	const month = Number(monthStr || "1") - 1;
	const day = Number(dayStr || "1");

	// currentDate.value = props.dateType === PeriodDateType.DAY
	// 	? new Date(year, month, day)
	// 	: new Date(year, month, 1);
  const oldDate = currentDate.value;
  
  if (props.dateType === PeriodDateType.DAY) {
    // Keep old time, only update year, month, day
    const newDate = new Date(oldDate);
    newDate.setFullYear(year, month, day);
    currentDate.value = newDate;
  } else if (props.dateType === PeriodDateType.MONTH) {
    // For month: set year and month, keep day and time
    const newDate = new Date(oldDate);
    newDate.setFullYear(year, month, 1); // Usually day=1 for month picker
    currentDate.value = newDate;
  } else {
    // For year: set year only, keep month, day, time
    const newDate = new Date(oldDate);
    newDate.setFullYear(year);
    currentDate.value = newDate;
  }
	emitValue();
};

// Period navigation
const previousPeriod = () => {
	const date = new Date(currentDate.value);
	if (props.dateType === PeriodDateType.DAY) {
		date.setDate(date.getDate() - 1);
	} else if (props.dateType === PeriodDateType.MONTH) {
		date.setMonth(date.getMonth() - 1);
	} else {
		date.setFullYear(date.getFullYear() - 1);
	}
	currentDate.value = date;
	emitValue();
};

const nextPeriod = () => {
	const date = new Date(currentDate.value);
	if (props.dateType === PeriodDateType.DAY) {
		date.setDate(date.getDate() + 1);
	} else if (props.dateType === PeriodDateType.MONTH) {
		date.setMonth(date.getMonth() + 1);
	} else {
		date.setFullYear(date.getFullYear() + 1);
	}
	currentDate.value = date;
	emitValue();
};

const openDatePicker = () => {
	if (dateInput.value?.showPicker) {
		dateInput.value.showPicker();
	} else {
		dateInput.value?.focus();
	}
};
</script>


