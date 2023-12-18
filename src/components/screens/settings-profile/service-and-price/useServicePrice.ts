
import { ITableItem } from "@/components/ui/Admin-table/AdminTable/table.interface"
import { getServicePrice } from "@/config/api.config"

import { useAuth } from "@/hooks/useAuth"

import { ServicePriceService } from "@/services/service-price/servicePrice.service"
import { ChangeEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"

import { useParams, useRouter } from "next/navigation"

export const useServicePrice = () => {
	const router = useRouter()
	const {user} = useAuth()
	const id = user?._id
	const [searchTerm, setSearchTerm] = useState('')
	
	const queryData = useQuery(
		['service-price list'],
		() => ServicePriceService.getByContractor(id),
		{
			select: ({ data }) =>
				data.map(
					(servicePrice): ITableItem => ({
						_id: servicePrice._id,
						editUrl: getServicePrice(`service-price/edit/${servicePrice._id}`),
				
						title: servicePrice.title,
						price: servicePrice.price
					}) 
				),
			onError(error) {
				console.log(error, 'tag list')
			},
		}
	)

	


	
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}
	
	const { mutateAsync: createAsync } = useMutation(
		'create service-price',
		() => ServicePriceService.create(),

		{
			onError(error) {
				console.log(error, 'Создание услуги')
			},
			
			onSuccess({ data: _id }) {
						
				console.log('Создание услуги', 'create was successful')
				router.push((`service-price/edit/${_id}`))
			},
		}
	)


	const { mutateAsync: deleteAsync } = useMutation(
		'delete tag',
		(tagId: string) => ServicePriceService.delete(tagId),
		{
			onError(error) {
				console.log(error,'ошибка') 
				//toastError(error, 'Delete tag')
			},
			onSuccess() {
				console.log('удачно') 

				//toastr.success('Delete tag', 'delete was successful')
				queryData.refetch()
			},
		}
	)
	
	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
			createAsync
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	)
}