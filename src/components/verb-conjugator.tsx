"use client"
 
import React, { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

import { VerbConjugations } from "@/lib/models/VerbConjugations";

interface Props {
    
}
export const VerbConjugator = (props: Props) => {

    const [answers, setAnswers] = useState<VerbConjugations>({
        singularFirstPerson: 'á',
        singularSecondPerson: 'átt',
        singularThirdPerson: 'á',
        pluralFirstPerson: 'eigum',
        pluralSecondPerson: 'eigið',
        pluralThirdPerson: 'eiga'
    });

    const { register, handleSubmit } = useForm<VerbConjugations>()
    const onSubmit: SubmitHandler<VerbConjugations> = (data) => console.log(data)


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader className="items-center">
                    <CardTitle >
                        að eiga
                    </CardTitle>
                    <CardDescription>to own</CardDescription>
                </CardHeader>
                <CardContent >
                    <div className="grid grid-cols-2">
                        <div className="flex flex-grow mr-2">

                            <div className="flex item flex-col gap-y-5">
                                <div className="grid grid-cols-5">
                                    <div className="col-span-2">ég</div> 
                                    <Input 
                                        {...register("singularFirstPerson")}
                                        className="col-span-3"
                                        
                                    />
                                </div>

                                <div className="grid grid-cols-5">
                                    <div className="col-span-2">þú</div> 
                                    <Input 
                                        {...register("singularSecondPerson")}
                                        className="col-span-3"
                                    />
                                </div>

                                <div className="grid grid-cols-5">
                                    <div className="col-span-2">hann/hún/það</div> 
                                    <Input 
                                        {...register("singularThirdPerson")}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="flex flex-grow">

                            <div className="flex flex-col gap-y-5">
                                <div className="grid grid-cols-5">
                                    <div className="col-span-2">við</div> 
                                    <Input 
                                        {...register("pluralFirstPerson")}
                                        className="col-span-3"
                                    />
                                </div>

                                <div className="grid grid-cols-5">
                                    <div className="col-span-2">þið</div> 
                                    <Input 
                                        {...register("pluralSecondPerson")}
                                        className="col-span-3"
                                    />
                                </div>

                                <div className="grid grid-cols-5">
                                    <div className="col-span-2">þeir/þær/þau</div> 
                                    <Input 
                                        {...register("pluralThirdPerson")}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="text-center mt-5">
                        <Button type="submit">Submit</Button>
                    </div>
                    
                </CardContent>
            </Card>
        </form>
    )
}