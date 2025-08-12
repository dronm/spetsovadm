<template>
	<Button @click="onClick" class="action" :title="t('BtnAdd.title')" variant="btn-cmd">
		<font-awesome-icon :icon="['fas', 'plus']" />
	</Button>

	<Teleport to="body" v-if="addType == BtnAddType.modal">
		<Modal
			:show="showModal"
			v-bind="(addProps as ModalTypeProps).modalProps"
			@close="showModal = false"
		>
			<template #body>
				<component
					:is="(addProps as ModalTypeProps).comp"
					v-bind="(addProps as ModalTypeProps).compProps"
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
import { type ModalTypeProps, type ViewTypeProps } from "../types/btnOpen";
import { type BtnAddProps, BtnAddType } from "../types/btnAdd";
import { uniqueID } from "../utils/utils";

const { addType, addProps } = defineProps<BtnAddProps>();

const router = useRouter();

const { t } = useI18n();

const showModal = ref(false);

const onClick = () => {
	if (addType === BtnAddType.modal) {
		showModal.value = true;
	} else if (addType === BtnAddType.view) {
		const viewProps = addProps as ViewTypeProps;

		const viewId = uniqueID();
		const resolvedRoute = router.resolve({
			name: viewProps.routeName,
			query: { "view-id": viewId },
		});

		const winStrProps = viewProps.winProps
			? Object.entries(viewProps.winProps)
					.map(([key, value]) => `${key}=${value}`)
					.join(",")
			: "";
		window.open(resolvedRoute.href, "_blank", winStrProps);

		window.addEventListener("message", (event) => {
			console.log("event from", event);
			if (event.data && event.data.viewId === viewId) {
				console.log(
					"modified",
					event.data.modified,
					event.data.modified === true,
				);

				const senderWindow = event.source as Window;
				if (senderWindow && "close" in senderWindow) {
					senderWindow.close();
				}
			}
		});
	}
};
</script>
