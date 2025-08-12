<template>
	<Transition name="modal">
		<div v-if="show" v-bind:style="{ 'z-index': zIndex }" class="modal-mask">
			<div
				ref="modalRef"
				class="modal-container"
				:style="[
					{ width: dialogWidth },
					{ height: dialogHeight },
					{ borderRadius: borderRadius },
					{ transform: `translate(${posX}px, ${posY}px)` },
				]"
			>
				<div 
					class="modal-header flex justify-between items-center px-4 py-2 bg-blue-300 text-white rounded-t"
					@mousedown="startDrag"
					@touchstart="startDrag"
					style="cursor: move"
				>
					<slot name="header">
						<button
							v-if="headClose"
							class="modal-default-button"
							@click="$emit('close')"
						>
							×
						</button>
					</slot>
				</div>

				<div class="modal-body">
					<slot name="body"></slot>
				</div>

				<div class="modal-footer">
					<slot name="footer">
						<Button
							v-if="okShow"
							class="modal-default-button"
							@click="$emit('close')"
							>{{ okText }}
						</Button>
					</slot>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

import Button from "./Button.vue";

interface Props {
	show?: boolean;
	okText?: string;
	okShow?: boolean;
	headClose?: boolean;
	dialogWidth?: string;
	dialogHeight?: string;
	borderRadius?: string;
	zIndex?: number;
}

const {
	show = true,
	okText = "Ok",
	okShow = false,
	headClose = true,
	dialogWidth = "20%",
	dialogHeight,
	borderRadius = "5px",
	zIndex = 100,
} = defineProps<Props>();

const emit = defineEmits();

const handleEscape = (event: KeyboardEvent) => {
	if (event.key === "Escape") {
		emit("close");
	}
};

//dragging support
const posX = ref(0);
const posY = ref(0);
const isDragging = ref(false);
const dragStartX = ref(0);
const dragStartY = ref(0);

const modalRef = ref<HTMLElement | null>(null);

const startDrag = (e: MouseEvent | TouchEvent) => {
	isDragging.value = true;

	const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
	const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

	dragStartX.value = clientX - posX.value;
	dragStartY.value = clientY - posY.value;

	document.addEventListener("mousemove", onDrag);
	document.addEventListener("mouseup", stopDrag);
	document.addEventListener("touchmove", onDrag);
	document.addEventListener("touchend", stopDrag);
};

const onDrag = (e: MouseEvent | TouchEvent) => {
	if (!isDragging.value) return;

	const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
	const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

	posX.value = clientX - dragStartX.value;
	posY.value = clientY - dragStartY.value;
};

const stopDrag = () => {
	isDragging.value = false;
	document.removeEventListener("mousemove", onDrag);
	document.removeEventListener("mouseup", stopDrag);
	document.removeEventListener("touchmove", onDrag);
	document.removeEventListener("touchend", stopDrag);
};

onMounted(() => {
	window.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
	window.removeEventListener("keydown", handleEscape);
});
</script>

<style>
.modal-mask {
	position: fixed;
	/*z-index: 9998;*/
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	transition: opacity 0.3s ease;
}

.modal-container {
	width: 300px;
	margin: auto;
	/* padding: 20px 30px; */
	background-color: #fff;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	transition: all 0.3s ease;
}

.modal-header h3 {
	margin-top: 0;
	/* color: #42b983; */
}

.modal-body {
	margin: 20px 0;
}

.modal-default-button {
	float: right;
	cursor: pointer;
	border: none;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
	opacity: 0;
}

.modal-leave-to {
	opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}
</style>

