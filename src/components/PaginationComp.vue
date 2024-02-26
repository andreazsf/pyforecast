<template>
	<div class="flex items-center">
		<div class="text-14 ob-text-accent-2 q-mr-md md">Rows</div>
		<div>
			<q-select
				borderless
				v-model="selectedRow"
				:options="rowsPerpage"
				@update:model-value="updatePagination()"
				class="
					ob-select-field ob-border-radius-50
					height-31
					min-width-90
					ob-border-accent-0
					text-center text-15
					q-mr-md
				"
				:popup-content-class="DarkMode ? 'ob-option-style-dark' : 'ob-option-style-light'"
			/>
		</div>
		<div class="ob-pagination-container flex justify-center items-center">
			<q-pagination
				v-model="childPagination.page"
				color="grey-8"
				:max="Math.ceil(numberOfRows.length / selectedRow)"
				size="sm"
				direction-links
				class="pagination"
				@update:model-value="updatePagination()"
			/>
			<div class="ob-pagination-select-input text-no-wrap">
				<q-select
					class="ob-input-field"
					v-model="selectedRow"
					dense
					rounded
					outlined
					:display-value="`${
						selectedRows * childPagination.page > numberOfRows.length
							? numberOfRows.length
							: selectedRows * childPagination.page
					} / ${numberOfRows.length}`"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';
// import {DarkMode} from 'src/core/composables/Triggers'
export default {
	emits: ['update:pagination'],
	props: {
		pagination: {
			sortBy: String,
			descending: Boolean,
			page: Number,
			rowsPerPage: Number,
		},
		numRows: Array,
	},
	setup(props, { emit }) {
		const $q = useQuasar();
		let childPagination = ref(props.pagination);
		let numberOfRows = computed(() => props.numRows);
		let selectedRow = ref(childPagination.value.rowsPerPage);
		let selectedRows = ref(selectedRow);
		const options = ref([]);
		const rowsPerpage = ref([10, 15, 20, 25, 30, 35, 40, 45, 50]);
		/**
		 * on update/select pagination
		 * change select value and emit changes to parent
		 */
		let updatePagination = () => {
			childPagination.value.rowsPerPage = selectedRow.value;
			emit('update:pagination', childPagination.value);
			console.log('childPagination.value ', childPagination.value);
		};

		//vuex store
		let store = useStore();
		let DarkMode = ref(false);
		return {
			DarkMode,
			childPagination,
			updatePagination,
			options,
			rowsPerpage,
			selectedRow,
			selectedRows,
			numberOfRows,
			//getters
		};
	},
};
</script>

<style></style>
