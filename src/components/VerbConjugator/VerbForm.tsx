
import { Center, Grid, TextInput } from "@mantine/core"

import { IVerbConjugation } from "@/lib/models/IVerbConjugation"

interface Props {
    userAnswers: IVerbConjugation
    onUserAnswersChanged: (userAnswers: IVerbConjugation) => void
}
export const VerbForm = (props: Props) => {

    const userAnswers = props.userAnswers;
    const onUserAnswersChanged = props.onUserAnswersChanged;

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
                            value={userAnswers.singularFirstPerson}
                            onChange={(event) => onUserAnswersChanged({ ...userAnswers, singularFirstPerson: event.target.value })}
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
                            value={userAnswers.pluralFirstPerson}
                            onChange={(event) => onUserAnswersChanged({ ...userAnswers, pluralFirstPerson: event.target.value })}
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
                            value={userAnswers.singularSecondPerson}
                            onChange={(event) => onUserAnswersChanged({ ...userAnswers, singularSecondPerson: event.target.value })}
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
                            value={userAnswers.pluralSecondPerson}
                            onChange={(event) => onUserAnswersChanged({ ...userAnswers, pluralSecondPerson: event.target.value })}
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
                            value={userAnswers.singularThirdPerson}
                            onChange={(event) => onUserAnswersChanged({ ...userAnswers, singularThirdPerson: event.target.value })}
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
                            value={userAnswers.pluralThirdPerson}
                            onChange={(event) => onUserAnswersChanged({ ...userAnswers, pluralThirdPerson: event.target.value })}
                        />
                    </Grid.Col>
                </Grid>
            </Grid.Col>
        </>
    )
}