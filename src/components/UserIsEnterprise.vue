<template>
	<div>
		<span class="block text-sm font-medium text-gray-600 mb-1">{{
			t('UserRegister.is_enterprise.label')
		}}</span>
		<div class="flex items-center space-x-4">
			<label class="flex items-center space-x-2">
				<input
					type="radio"
					:value="false"
					required
					v-model="isEnterprise"
					class="form-radio text-green-600"
				/>
				<span>{{ t('UserRegister.is_enterprise.person') }}</span>
			</label>
			<label class="flex items-center space-x-2">
				<input
					type="radio"
					:value="true"
					v-model="isEnterprise"
					class="form-radio text-green-600"
				/>
				<span>{{ t('UserRegister.is_enterprise.enterprise') }}</span>
			</label>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const isEnterprise = defineModel<boolean>();
</script>
