import { useState } from "react";

import { Button, Center, Grid, Paper, TextInput } from "@mantine/core"

import { IVerb } from "../../lib/models/IVerb"
import { IVerbConjugation } from "@/lib/models/IVerbConjugation";

const pronouns = ['ég', 'við', 'þú', 'þið', 'hann/hún/það', 'þeir/þær/þau'];
interface Props {
    verb: IVerb
}
export const VerbConjugator = (props: Props) => {
    
    const [answers, setAnswers] = useState<IVerbConjugation>({
        singularFirstPerson: '',
        singularSecondPerson: '',
        singularThirdPerson: '',
        pluralFirstPerson: '',
        pluralSecondPerson: '',
        pluralThirdPerson: '',
    });

    const onAnswersChanged = (answer: IVerbConjugation) => {
        setAnswers((prevAnswers) => ({ ...prevAnswers, ...answer }));
    }

    const verb = props.verb;
    return (
        <Paper shadow="md" radius="xl" withBorder p="xl">
            <Grid>
                <Grid.Col span={12}>
                    <Center>
                        {verb.infinitive}
                    </Center>
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Grid>
                        <Grid.Col span={3}>
                            <Center>
                                ég
                            </Center>
                        </Grid.Col>
                        <Grid.Col span={9}>
                            <TextInput 
                                value={answers.singularFirstPerson}
                                onChange={(event) => onAnswersChanged({ ...answers, singularFirstPerson: event.target.value })}
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
                                value={answers.pluralFirstPerson}
                                onChange={(event) => onAnswersChanged({ ...answers, pluralFirstPerson: event.target.value })}
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
                                value={answers.singularSecondPerson}
                                onChange={(event) => onAnswersChanged({ ...answers, singularSecondPerson: event.target.value })}
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
                                value={answers.pluralSecondPerson}
                                onChange={(event) => onAnswersChanged({ ...answers, pluralSecondPerson: event.target.value })}
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
                                value={answers.singularThirdPerson}
                                onChange={(event) => onAnswersChanged({ ...answers, singularThirdPerson: event.target.value })}
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
                                value={answers.pluralThirdPerson}
                                onChange={(event) => onAnswersChanged({ ...answers, pluralThirdPerson: event.target.value })}
                            />
                        </Grid.Col>
                    </Grid>
                </Grid.Col>

                <Grid.Col span={12}>
                    <Center>
                        <Button variant="light">
                            Check Answers
                        </Button>
                    </Center>
                </Grid.Col>
            </Grid>
        </Paper>
    )
}