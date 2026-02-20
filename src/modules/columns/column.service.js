import {
	createColumn as createColumnRepo,
	getColumnById as getColumnByIdRepo,
	reorderColumns as reorderColumnsRepo,
	deleteColumn as deleteColumnRepo
} from './column.repository.js';

export const createColumn = async (data) => {
	const result = await createColumnRepo(data);
	return result;
}

export const getColumnById = async (id) => {
	const result = await getColumnByIdRepo(id);
	return result;
}

export const reorderColumns = async (data) => {
	const result = await reorderColumnsRepo(data);
	return result;
}

export const deleteColumn = async (id) => {
	const result = await deleteColumnRepo(id);
	return result;
}
