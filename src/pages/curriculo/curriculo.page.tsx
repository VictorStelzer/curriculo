import React, { useRef, useState } from 'react'

import { Box } from '@/components'

import { HeaderSection, Social, Profile, Education, Languages, Experience, Skills, Certificates, Interests, Footer } from './components'

export const Curriculum: React.FC = () => {

    const resumeRef = useRef<HTMLDivElement>(null)
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

    const handleDownloadPdf = async () => {
        if (!resumeRef.current) return

        setIsGeneratingPdf(true)

        const html2pdf = (await import('html2pdf.js')).default
        await html2pdf().set({
            margin: 0,
            filename: 'Curriculo.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 4,
                useCORS: true,
                windowWidth: 1100,
                onclone: (clonedDoc: Document) => {
                    clonedDoc.querySelectorAll('[data-pdf-hide]').forEach((el) => {
                        (el as HTMLElement).style.visibility = 'hidden'
                    })
                },
            },
            jsPDF: { format: 'a4', orientation: 'portrait' },
        }).from(resumeRef.current).save()

        setIsGeneratingPdf(false)
    }

    return (
        <Box sx={{ mb: { xs: 5, md: 0 }, boxShadow: { xs: 'none', md: 4 } }}>
            <Box ref={resumeRef} row="md" sx={{ maxWidth: '968px' }} gap={{ xs: 2, md: 0 }}>
                <Box
                    gap={2}
                    column
                    sx={[(theme) => ({
                        flex: 0.5,

                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
                        [theme.breakpoints.up('md')]: {
                            backgroundColor: theme.palette.background.paper,
                        },
                    }), { p: { xs: 0, md: '20px' } }]}
                >
                    <HeaderSection isDownloading={isGeneratingPdf} onDownload={handleDownloadPdf} />
                    <Social />
                    <Profile />
                    <Education />
                    <Languages />
                </Box>

                <Box
                    gap={2}
                    column
                    sx={{
                        flex: { md: 1 },
                        p: { xs: 0, md: '20px' },
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
                    }}
                >
                    <Experience />
                    <Skills />
                    <Certificates />
                    <Interests />
                </Box>
            </Box>

            <Footer />
        </Box>
    )
}
