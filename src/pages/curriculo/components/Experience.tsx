import React from 'react';

import { styles } from '../curriculo.styles';

import { Box, Text, Timeline } from '@/components';

export const Experience: React.FC = () => {
    const experiences = [
        {
            title: 'Desenvolvedor Front-end',
            period: 'Televets | Abr 2025 - Jul 2026',
            description: 'Desenvolvimento e manutenção de aplicações web e mobile utilizando React, React Native e TypeScript, integrando serviços de back-end em Python. Responsável pela arquitetura e criação de componentes reutilizáveis, consumo de APIs RESTful documentadas via Swagger e gerenciamento de estado. Atuação na estruturação de pipelines de CI/CD e testes automatizados no GitHub, ciclo completo de builds nativos para mobile, aplicação de padrões de projeto (Clean Code) e otimização de performance.'
        },
        {
            title: 'Documentação Técnica e Prototipagem',
            period: 'Vitrine das Artes | 2023 - 2024',
            description: 'Liderança do projeto na concepção, estudo de caso e estruturação técnica de produtos digitais. Responsável pelo levantamento e engenharia de requisitos, mapeamento de fluxos de usuários, elaboração de documentação técnica e prototipagem de alta fidelidade (UI/UX). Validação contínua com stakeholders para garantia de viabilidade técnica e alinhamento do negócio.'
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