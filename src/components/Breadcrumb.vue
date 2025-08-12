<template>
	<nav class="breadcrumb">
		<ul>
			<li v-for="(crumb, index) in breadcrumbs" :key="index">
				<span v-if="crumb.path === route.path">{{ crumb.label }}</span>
				<router-link v-else :to="crumb.path">{{
					crumb.label
				}}</router-link>
				<span v-if="index < breadcrumbs.length - 1"> / </span>
			</li>
		</ul>
	</nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const { t } = useI18n();

const breadcrumbs = computed(() => {
	if (!route.path) return []; // Ensure route.path is available

	const paths = route.path.split('/');
	if (paths.length && !paths[0].length) {
		paths[0] = '/';
	}

	return paths.map((path, index) => ({
		label: t(
			'MainLayout.routes.' + (path == '/' ? 'Main' : path) + '.caption',
		),
		path: path == '/' ? '/' : '/' + path,
	}));
});
</script>
