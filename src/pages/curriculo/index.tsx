import React from 'react'

import { Container } from '@/components'

import { Helmet } from 'react-helmet-async'
import { Curriculum } from './curriculo.page'
import { useTheme } from '@mui/material'

export const CurriculumPage: React.FC = () => {
    const theme = useTheme()

    return (
        <Container
            column
            alignItems
            bgcolor={{ xs: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50], md: theme.palette.background.default }}
        >
            <Helmet>
                <title>Currículo | Victor Stelzer</title>
            </Helmet>

            <Curriculum />
        </Container>
    )
}
