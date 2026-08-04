import React from 'react';

import { Box, Text } from '@/components';

import { styles } from '../curriculo.styles';

export const Certificates: React.FC = () => {
    const certificates = [
        { title: 'React Native & Vue.js', description: 'Maximilian Schwarzmüller' },
        { title: 'Prompt Engineering para Devs', description: 'Beer and Code' },
        { title: 'Full-Stack Web Bootcamp', description: 'Dr. Angela Yu' },
        { title: '100 Days of Code™: Python', description: 'Dr. Angela Yu' },
        { title: 'Desenvolvimento Flutter', description: 'Leonardo Moura Leitao' },
        { title: 'Excel + Power BI (Especialista)', description: 'Formação 7 cursos - Jilson Santana' },
    ]

    return (
        <Box id="certificates">
            <Text sx={styles.title}>Certificados</Text>

            <Box column gap={2}>
                {certificates.map((certificate, index) => (
                    <Box key={index} column>
                        <Text variant="subtitle1" fontWeight="bold">{certificate.title}</Text>
                        <Text variant="subtitle2">{certificate.description}</Text>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
