import { useState } from "react";

import { Button, Center, Grid, Paper } from "@mantine/core"

import { IVerb } from "../../lib/models/IVerb"
import { IVerbConjugation } from "@/lib/models/IVerbConjugation";

import { VerbForm } from "./VerbForm";
import { VerbAnswers } from "./VerbAnswers";

const pronouns = ['ég', 'við', 'þú', 'þið', 'hann/hún/það', 'þeir/þær/þau'];
interface Props {
    verb: IVerb
}
export const VerbConjugator = (props: Props) => {
    
    const [userAnswers, setAnswers] = useState<IVerbConjugation>({
        singularFirstPerson: '',
        singularSecondPerson: '',
        singularThirdPerson: '',
        pluralFirstPerson: '',
        pluralSecondPerson: '',
        pluralThirdPerson: '',
    });

    const actualAnswers = {
        singularFirstPerson: 'á',
        pluralFirstPerson: 'eigum',
        singularSecondPerson: 'átt',
        pluralSecondPerson: 'eigið',
        singularThirdPerson: 'á',
        pluralThirdPerson: 'eiga'
    };

    const onUserAnswersChanged = (answer: IVerbConjugation) => {
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
                
                <VerbForm 
                    userAnswers={userAnswers}
                    onUserAnswersChanged={onUserAnswersChanged}
                />
                <VerbAnswers
                    userAnswers={userAnswers}
                    actualAnswers={actualAnswers}
                />

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