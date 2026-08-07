import React from 'react';

import { styles } from '../curriculo.styles';

import { Box, Text, Timeline } from '@/components';

export const Experience: React.FC = () => {
    const experiences = [
        {
            title: 'Desenvolvedor Front-end',
            period: 'Televets | Abr 2025 - Jul 2026',
            description: 'Desenvolvimento e manutenção de aplicações web e mobile utilizando React, React Native e TypeScript. Responsável pela arquitetura e criação de componentes reutilizáveis, consumo de APIs RESTful documentadas via Swagger e gerenciamento de estado das aplicações. Atuação no ciclo completo de builds nativos para mobile, aplicação de padrões de projeto (Clean Code) e otimização de performance, garantindo a integridade dos dados e a escalabilidade do sistema.'
        },
        {
            title: 'Documentação Técnica e Prototipagem',
            period: 'Vitrine das Artes | 2023 - 2024',
            description: 'Atuação na concepção e estruturação técnica de produtos digitais. Responsável pela elaboração de documentação técnica, mapeamento de fluxos e criação de protótipos de alta fidelidade (UI/UX). Levantamento e validação de requisitos funcionais com stakeholders para garantia de viabilidade técnica e alinhamento de negócio.'
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