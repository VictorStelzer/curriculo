import React from 'react';

import { styles } from '../curriculo.styles';

import { Box, Text, Timeline } from '@/components';

export const Experience: React.FC = () => {
    const experiences = [
        {
            title: 'Desenvolvedor Front-end',
            period: 'Televets | Abr 2025 - Jul 2026',
            description: 'Desenvolvimento e manutenção web/mobile com React e TypeScript. Integração de APIs RESTful (Swagger) e aplicação de boas práticas (Clean Code), focando em performance, escalabilidade e integridade dos dados.'
        },
        {
            title: 'Documentação Técnica e Prototipagem',
            period: 'Vitrine das Artes | 2023 - 2024',
            description: 'Liderança técnica na concepção de produtos, elaboração de documentação e prototipagem de alta fidelidade (UI/UX). Validação de requisitos funcionais com stakeholders para alinhar negócio e tecnologia.'
        }
    ];

    return (
        <Box id="experience">
            <Text sx={styles.title}>Experiências</Text>

            <Timeline
                items={experiences.map((exp) => ({
                    title: exp.title,
                    children: (
                        <Box column gap={0.5}>
                            <Text variant='body2' color='text.secondary'>{exp.period}</Text>
                            <Text variant='body2' color='text.secondary'>{exp.description}</Text>
                        </Box>
                    )
                }))}
            />
        </Box>
    )
}