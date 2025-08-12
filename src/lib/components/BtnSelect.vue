<template>
	<Button @click="onClick" :title="t('BtnSelect.title')" class="action" variant="btn-cmd">
		<font-awesome-icon :icon="['fas', 'list-check']" />
	</Button>

	<Teleport to="body" v-if="selectType === BtnSelectType.modal">
		<Modal
			:show="showModal"
			v-bind="(selectProps as ModalTypeProps).modalProps"
			@close="onCancelSelect"
		>
			<template #body>
				<component
					:is="(selectProps as ModalTypeProps).comp"
					v-bind="(selectProps as ModalTypeProps).compProps"
					@selected="onSelected"
					@cancel="onCancelSelect"
				>
				</component>
			</template>
		</Modal>
	</Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import Button from "./Button.vue";
import Modal from "./Modal.vue";
import { uniqueID } from "../utils/utils";
import { BtnSelectType, type BtnSelectProps } from "../types/btnSelect";
import type { ModalTypeProps, ViewTypeProps } from "../types/btnOpen";

//any type: ref|string whatever passed from component or view
const selectedItem = defineModel();

const { selectType, selectProps } = defineProps<BtnSelectProps>();

const emit = defineEmits(["select"]);

const router = useRouter();

const { t } = useI18n();

const showModal = ref(false);

const onClick = () => {
	if (selectType === BtnSelectType.modal) {
		showModal.value = true;
	} else {
		//view
		const viewProps = selectProps as ViewTypeProps;
		const viewId = uniqueID();
		const resolvedRoute = router.resolve({
			name: viewProps.routeName,
			query: { "view-id": viewId },
		});

		const winStrProps = Object.entries(viewProps.winProps ?? {})
			.map(([key, value]) => `${key}=${value}`)
			.join(",");
		window.open(resolvedRoute.href, "_blank", winStrProps);

		window.addEventListener("message", (event) => {
			if (event.data && event.data.viewId === viewId) {
				console.log(event.data);
				emit("select", event.data.selectData);

				const senderWindow = event.source as Window;
				if (senderWindow && "close" in senderWindow) {
					senderWindow.close();
				}
			}
		});
	}
};

const onCancelSelect = () => {
	showModal.value = false;
};

const onSelected = (item: any | undefined) => {
	showModal.value = false;
	selectedItem.value = item;
};
</script>
