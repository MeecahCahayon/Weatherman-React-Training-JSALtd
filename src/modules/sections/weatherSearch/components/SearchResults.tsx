import React from 'react'
import { useSelector } from 'react-redux'

import { Location as LocationType } from '../../../api/types'
import { RootStoreState } from '../../../root'
import { LocationCard } from '.'
import { Skeleton, Stack, Typography } from '@mui/material'
import { isEmpty } from 'lodash'

const SearchResults = (): JSX.Element => {

	const isLoading = useSelector<RootStoreState, boolean>(state => state.search.loading)
	const isInitial = useSelector<RootStoreState, boolean>(state => state.search.initial)
	const error = useSelector<RootStoreState, Error | undefined>(state => state.search.error)
	const results = useSelector<RootStoreState, LocationType[]>(state => state.search.searchResults)

	if (isLoading) {
		return (
			<Stack gap={3}>
				{[...Array(2)].map(i => <Skeleton key={i} variant="text" height={70} className='locationCard' />)}
			</Stack>
		)
	}

	if (error) {
		return (
			<Stack alignItems={'center'}>
				<Typography variant='body1'> Something went wrong, please try again </Typography>
			</Stack>
		)
	}

	return (
		<>
			{!isEmpty(results) && (
				<Stack gap={3}>
					{results.map(item => <LocationCard key={item.id} location={item} />)}
				</Stack>
			)}

			{!isInitial && isEmpty(results) && (
				<Stack alignItems={'center'}>
					<Typography variant='body1'> No locations found </Typography>
				</Stack>
			)}
		</>
	)
}

export default SearchResults
