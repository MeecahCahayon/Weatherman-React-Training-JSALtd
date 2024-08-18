import './styles/Search.scss'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Button, InputAdornment, Stack, TextField, Typography } from '@mui/material'

import { fetchLocationsAction } from './actions'
import { SearchResults } from './components'
import { SearchIcon } from '../../assets'

const SearchSection = (): JSX.Element => {

	const dispatch = useDispatch()

	const [query, setQuery] = useState<string>('')

	const _handleQueryChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value)
	}

	const _fetchLocations = () => {
		if (query) {
			dispatch(fetchLocationsAction.started(query))
		}
	}

	return (
		<Stack px={2} py={2} gap={5}>
			<Stack alignItems={'center'}>
				<Typography variant='h3'> JSA Weatherman </Typography>				
			</Stack>

			<Stack flexDirection={'row'} gap={5}>
				<TextField 
					id='search-location-id'
					size='small'
					fullWidth
					autoFocus
					placeholder='Search Location'
					value={query}
					onChange={_handleQueryChanged}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<SearchIcon width={16} height={16} />
							</InputAdornment>
						)
					}}
					onKeyDown={e => e.key === 'Enter' && _fetchLocations()}
				/>

				<Button 
					variant='contained' 
					size='small' 
					disabled={!query}
					onClick={_fetchLocations}
				> 
					Search 
				</Button>
			</Stack>

			<SearchResults />
		</Stack>
	)
}

export default SearchSection
