<template>
	<Button @click="onClick" class="action" :title="t('BtnOpen.title')" variant="btn-cmd">
		<font-awesome-icon :icon="['fas', 'pen']" />
	</Button>

	<Teleport to="body" v-if="openType == BtnOpenType.modal">
		<Modal
			:show="showModal"
			v-bind="(openProps as ModalTypeProps).modalProps"
			@close="showModal = false"
		>
			<template #body>
				<component
					:is="(openProps as ModalTypeProps).comp"
					v-bind="(openProps as ModalTypeProps).compProps"
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
import {
	type BtnOpenProps,
	BtnOpenType,
	type ModalTypeProps,
	type ViewTypeProps,
} from "../types/btnOpen";
import { uniqueID } from "../utils/utils";

const { openType, keys, openProps } = defineProps<BtnOpenProps>();

const router = useRouter();

const { t } = useI18n();

const showModal = ref(false);

const onClick = () => {
	//check if keys are set
	let allKeysSet = true;
	for (let k in keys) {
		if (
			keys[k] === undefined ||
			keys[k] === null ||
			(typeof keys[k] === "number" && keys[k] === 0)
		) {
			allKeysSet = false;
			break;
		}
	}
	if (!allKeysSet) {
		return;
	}
	if (openType === BtnOpenType.modal) {
		showModal.value = true;
	} else if (openType === BtnOpenType.router) {
		//typecast
		const safeQuery: Record<string, string | number | null | undefined> = {};
		for (const [key, val] of Object.entries(keys ?? {})) {
			safeQuery[key] =
				val === false
					? "false"
					: val === true
						? "true"
						: val != null
							? String(val)
							: undefined;
		}
		router.push({
			name: openProps as string,
			query: safeQuery,
		}); //redirect
	} else if (openType === BtnOpenType.view) {
		const viewProps = openProps as ViewTypeProps;

		const viewId = uniqueID();
		const resolvedRoute = router.resolve({
			name: viewProps.routeName,
			query: { "view-id": viewId, ...keys },
		});

		const winStrProps = viewProps.winProps
			? Object.entries(viewProps.winProps)
					.map(([key, value]) => `${key}=${value}`)
					.join(",")
			: "";
		window.open(resolvedRoute.href, "_blank", winStrProps);

		window.addEventListener("message", (event) => {
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
