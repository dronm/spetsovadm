<template>
	<Breadcrumb />

	<ViewHeader>
		{{ $t('MainLayout.routes.About.captionFull') }}
	</ViewHeader>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
		luctus enim non vehicula tincidunt. Curabitur eget congue nisl, et
		mollis ex. Praesent hendrerit commodo placerat. Sed at consequat turpis.
		Pellentesque eget luctus elit. Donec nec ornare orci. Donec eleifend a
		lacus non viverra. Maecenas vestibulum enim odio, eu vehicula nibh
		eleifend et. Nunc pharetra consequat varius. Vestibulum nibh enim,
		varius vel ligula vitae, placerat blandit neque.
	</p>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import Breadcrumb from '@/components/Breadcrumb.vue';
import ViewHeader from '@/components/ViewHeader.vue';

const { t } = useI18n();
</script>
