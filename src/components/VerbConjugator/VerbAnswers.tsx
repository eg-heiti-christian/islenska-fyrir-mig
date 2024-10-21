
import { useMantineTheme } from "@mantine/core";
import { Center, Grid, TextInput, Box, Text } from "@mantine/core"
import { Check, X } from 'lucide-react';

import { IVerbConjugation } from "@/lib/models/IVerbConjugation"

interface Props {
    userAnswers: IVerbConjugation
    actualAnswers: IVerbConjugation
}
export const VerbAnswers = (props: Props) => {

    const theme = useMantineTheme();
    theme.fontSizes

    const userAnswers = props.userAnswers;
    const actualAnswers = props.actualAnswers;

    const isAnswerCorrect = (userAnswer: string, actualAnswer: string) => {
        userAnswer = userAnswer.trim().toLowerCase();
        actualAnswer = actualAnswer.trim().toLowerCase();
        if (userAnswer === actualAnswer) {
            return true;
        }
        return false;
    }
    const displayIcon = (userAnswer: string, actualAnswer: string) => {
        if (isAnswerCorrect(userAnswer, actualAnswer)) {
            return <Check style={{ color: theme.colors.green[9] }} />;
        }
        return <X style={{ color: theme.colors.red[9] }} />;
    }

    return (
        <>
            <Grid.Col span={{ base: 12, lg: 6 }}>
                <Grid>
                    <Grid.Col span={3}>
                        <Center>
                            ég
                        </Center>
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <TextInput
                            value={actualAnswers.singularFirstPerson}
                            readOnly
                            leftSectionWidth={'50%'}
                            leftSection={
                                <Text 
                                    size='sm' 
                                    style={{ 
                                        color: (isAnswerCorrect(userAnswers.singularFirstPerson, actualAnswers.singularFirstPerson)) ? theme.colors.green[9] : theme.colors.red[9], 
                                    }}
                                >
                                    {userAnswers.singularFirstPerson}
                                </Text>
                            }
                            rightSection={displayIcon(userAnswers.singularFirstPerson, actualAnswers.singularFirstPerson)}
                        />
                    </Grid.Col>
                </Grid>
            </Grid.Col>

            <Grid.Col span={{ base: 12, lg: 6 }}>
                <Grid>
                    <Grid.Col span={3}>
                        <Center>
                            við
                        </Center>
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <TextInput
                            value={actualAnswers.pluralFirstPerson}
                            readOnly
                            leftSectionWidth={'50%'}
                            leftSection={
                                <Text
                                    size='sm'
                                    style={{
                                        color: (isAnswerCorrect(userAnswers.pluralFirstPerson, actualAnswers.pluralFirstPerson)) ? theme.colors.green[9] : theme.colors.red[9]
                                    }}
                                >
                                    {userAnswers.pluralFirstPerson}
                                </Text>
                            }
                            rightSection={displayIcon(userAnswers.pluralFirstPerson, actualAnswers.pluralFirstPerson)}
                        />
                    </Grid.Col>
                </Grid>
            </Grid.Col>

            <Grid.Col span={{ base: 12, lg: 6 }}>
                <Grid>
                    <Grid.Col span={3}>
                        <Center>
                            þú
                        </Center>
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <TextInput
                            value={actualAnswers.singularSecondPerson}
                            readOnly
                            leftSectionWidth={'50%'}
                            leftSection={
                                <Text
                                    size='sm'
                                    style={{
                                        color: (isAnswerCorrect(userAnswers.singularSecondPerson, actualAnswers.singularSecondPerson)) ? theme.colors.green[9] : theme.colors.red[9]
                                    }}
                                >
                                    {userAnswers.singularSecondPerson}
                                </Text>
                            }
                            rightSection={displayIcon(userAnswers.singularSecondPerson, actualAnswers.singularSecondPerson)}
                        />
                    </Grid.Col>
                </Grid>
            </Grid.Col>

            <Grid.Col span={{ base: 12, lg: 6 }}>
                <Grid>
                    <Grid.Col span={3}>
                        <Center>
                            þið
                        </Center>
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <TextInput
                            value={actualAnswers.pluralSecondPerson}
                            readOnly
                            leftSectionWidth={'50%'}
                            leftSection={
                                <Text
                                    size='sm'
                                    style={{
                                        color: (isAnswerCorrect(userAnswers.pluralSecondPerson, actualAnswers.pluralSecondPerson)) ? theme.colors.green[9] : theme.colors.red[9]
                                    }}
                                >
                                    {userAnswers.pluralSecondPerson}
                                </Text>
                            }
                            rightSection={displayIcon(userAnswers.pluralSecondPerson, actualAnswers.pluralSecondPerson)}
                        />
                    </Grid.Col>
                </Grid>
            </Grid.Col>

            <Grid.Col span={{ base: 12, lg: 6 }}>
                <Grid>
                    <Grid.Col span={3}>
                        <Center>
                            hann/hún/það
                        </Center>
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <TextInput
                            value={actualAnswers.singularThirdPerson}
                            readOnly
                            leftSectionWidth={'50%'}
                            leftSection={
                                <Text
                                    size='sm'
                                    style={{
                                        color: (isAnswerCorrect(userAnswers.singularThirdPerson, actualAnswers.singularThirdPerson)) ? theme.colors.green[9] : theme.colors.red[9]
                                    }}
                                >
                                    {userAnswers.singularThirdPerson}
                                </Text>
                            }
                            rightSection={displayIcon(userAnswers.singularThirdPerson, actualAnswers.singularThirdPerson)}
                        />
                    </Grid.Col>
                </Grid>
            </Grid.Col>

            <Grid.Col span={{ base: 12, lg: 6 }}>
                <Grid>
                    <Grid.Col span={3}>
                        <Center>
                            þeir/þær/þau
                        </Center>
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <TextInput
                            value={actualAnswers.pluralThirdPerson}
                            readOnly
                            leftSectionWidth={'50%'}
                            leftSection={
                                <Text
                                    size='sm'
                                    style={{
                                        color: (isAnswerCorrect(userAnswers.pluralThirdPerson, actualAnswers.pluralThirdPerson)) ? theme.colors.green[9] : theme.colors.red[9]
                                    }}
                                >
                                    {userAnswers.pluralThirdPerson}
                                </Text>
                            }
                            rightSection={displayIcon(userAnswers.pluralThirdPerson, actualAnswers.pluralThirdPerson)}
                        />
                    </Grid.Col>
                </Grid>
            </Grid.Col>
        </>
    )
}