import { Grid } from "@mantine/core"

import { VerbConjugator } from "../components/VerbConjugator/VerbConjugator"
import { IVerb } from "../lib/models/IVerb"

export const VerbsPresentTensePage = () => {

    const verb: IVerb = {
        infinitive: 'að eiga'
    }
    return (
        <Grid>
            <Grid.Col span={10} offset={1}>
                <VerbConjugator
                    verb={verb}
                />
            </Grid.Col>
        </Grid>
    )
}