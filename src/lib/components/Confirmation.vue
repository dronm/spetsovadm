<template>
	<Teleport to="body">
		<modal
			:show="showConfirmation"
			:dialogWidth="dialogWidth"
			:borderRadius="borderRadius"
			@close="showConfirmation = false"
			:zIndex="1000"
		>
			<template #body>
				{{ txt }}
			</template>

			<template #footer>
				<div class="container-form-cmd">
					<Button
						v-if="confirm"
						:title="$t('Confirmation.confirmTitle')"
						@click="
							$emit('confirm');
							showConfirmation = false;
						"
					>
						{{ t("Confirmation.confirmCaption") }}
					</Button>

					<Button
						v-if="reject"
						:title="$t('Confirmation.rejectTitle')"
						@click="
							$emit('reject');
							showConfirmation = false;
						"
					>
						{{ t("Confirmation.rejectCaption") }}
					</Button>

					<Button
						v-if="cancel"
						:title="$t('Confirmation.cancelTitle')"
						@click="
							$emit('cancel');
							showConfirmation = false;
						"
					>
						{{ t("Confirmation.cancelCaption") }}
					</Button>
				</div>
			</template>
		</modal>
	</Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";

import Modal from "./Modal.vue";
import Button from "./Button.vue";

const { t } = useI18n();

const emit = defineEmits<{
	confirm: [];
	reject: [];
	cancel: [];
	timeout: [];
}>();

interface Props {
	dialogWidth?: string;
	borderRadius?: string;
	txt: string;
	timeout?: number;
	confirm?: boolean;
	reject?: boolean;
	cancel?: boolean;
}

const {
	dialogWidth = "50%",
	borderRadius = "5",
	txt,
	timeout = 0,
	confirm = true,
	reject = true,
	cancel = false,
} = defineProps<Props>();

const showConfirmation = defineModel<boolean>();

let timeoutId: number;

const handleKeyDown = (event: KeyboardEvent) => {
	if (event.key === "Escape") {
		event.stopPropagation();
		event.preventDefault();
		emit("reject");
		showConfirmation.value = false;
	}
};

onMounted(() => {
	if (timeout) {
		timeoutId = window.setTimeout(() => {
			emit("timeout");
			showConfirmation.value = false;
		}, timeout);
	}

	// Add event listener for Escape key
	window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
	if (timeoutId) {
		window.clearTimeout(timeoutId);
	}

	// Remove event listener
	window.removeEventListener("keydown", handleKeyDown);
});
</script>
