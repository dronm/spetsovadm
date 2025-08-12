<template>
	<ul class="flex space-x-4">
		<li v-for="p in dataRow[colId] as Picture[]" :key="p.ref_1c">
			<img
				:src="imgSrc(p)"
				:title="imgTitle(p)"
				class="w-12 h-auto object-contain rounded shadow"
				@click="showImage(p)"
			/>
		</li>
	</ul>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import type { FormData } from '@/lib/types/form';
import {
	useNotificationStore,
	MessageType,
} from '@/lib/stores/useNotificationStore';

import { type Picture } from '@/models/picture';

const { t } = useI18n();

interface Props {
	dataRow: FormData;
	rowIndex: number;
	previewDir: string;
	detailDir: string;
	previewTitle: string;
	colId: string; //picture array column id
}
const { dataRow, rowIndex, previewDir, detailDir, previewTitle, colId } =
	defineProps<Props>();

const imgSrc = (p: Picture) => `${previewDir}/${p.ref_1c}.png`;
const imgTitle = (p: Picture) =>
	t(previewTitle, { SIZE: (p.size / 1024).toFixed(2) });

const notificationStore = useNotificationStore();

const showImage = (p: Picture) => {
	const offset = 20;
	const h = (window.innerWidth / 3) * 2;
	const left = window.innerWidth / 2;
	const w = left - 20;
	const newWindow = window.open(
		`${detailDir}/${p.ref_1c}.${p.ext}`,
		'_blank',
		'location=0,menubar=0,status=0,titlebar=0,top=' +
			(50 + offset) +
			',left=' +
			(left + offset) +
			',width=' +
			w +
			',height=' +
			h,
	);
	if (!newWindow) {
		notificationStore.addNotification(
			t('GridColPicts.alertPopupBlocked'),
			3000,
			MessageType.Err,
		);
	}
};
</script>
