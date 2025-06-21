import React from 'react'
import { Home } from '../components/Layouts/Home'
import { MultiCardSections } from '../components/Card/Card'
import { RelatedItems } from '../components/Layouts/Related_Items'
import { Box } from '@mui/material'
import { AdditionalItems } from '../components/Layouts/Additional_items'
import { Shopping_card } from '../components/Layouts/Shopping_card'
import { Launchpad } from '../components/Layouts/Launchpad'
import { Viewed_items } from '../components/Layouts/Viewed_items'

export const HomePage = () => {
    return (
        <Box sx={{ backgroundColor: "#E3E6E6" }}>
            <Home />
            <MultiCardSections />
            <RelatedItems />
            <AdditionalItems />
            <Shopping_card />
            <Launchpad/>
            <Viewed_items/>

        </Box>
    )
}


