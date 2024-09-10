"use client"
 
import * as React from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"


interface Props {
    
}
export const VerbConjugator = (props: Props) => {

    return (
        <Card>
            <CardHeader className="items-center">
                <CardTitle >
                    að eiga
                </CardTitle>
                <CardDescription>to own</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2">
                <div className="flex flex-grow mr-2">

                    <div className="flex flex-col">
                        <div className="grid grid-cols-5">
                            <div className="col-span-2">ég</div> 
                            <Input className="col-span-3" />
                        </div>

                        <div className="grid grid-cols-5">
                            <div className="col-span-2">þú</div> 
                            <Input className="col-span-3" />
                        </div>

                        <div className="grid grid-cols-5">
                            <div className="col-span-2">hann/hún/það</div> 
                            <Input className="col-span-3" />
                        </div>
                    </div>

                </div>
                <div className="flex flex-grow">

                    <div className="flex flex-col">
                        <div className="grid grid-cols-5">
                            <div className="col-span-2">við</div> 
                            <Input className="col-span-3" />
                        </div>

                        <div className="grid grid-cols-5">
                            <div className="col-span-2">þið</div> 
                            <Input className="col-span-3" />
                        </div>

                        <div className="grid grid-cols-5">
                            <div className="col-span-2">þeir/þær/þau</div> 
                            <Input className="col-span-3" />
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}