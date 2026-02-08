import { Prisma } from "@prisma/client";
import { Inngest } from "inngest";
import { Prisma } from "../configs/prisma.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "project-management" });

// Inngest function to save user data to a databse when a user is created in Clerk

const syncUserCreation = inngest.createFunction(
    {id: "sync-user-from-clerk"},
    {event: "clerk/user.created"},
    async({event}) => {
        const {data} = event
        await Prisma.user.create({
            data: {
                id: data.id,
                email: data?.email_addresses[0]?.email_addresses,
                name: data?.first_name + " " + data?.last_name,
                image: data?.image_url,

            }
        })

    }
)

//Inngest Function to delete user data from database

const syncUserDeletion = inngest.createFunction(
    {id: "delete-user-from-clerk"},
    {event: "clerk/user.deleted"},
    async({event}) => {
        const {data} = event
        await Prisma.user.delete({
            where: {
                id: data.id
            }
        })

    }
)

//Inngest Function to update user data in database

const syncUserUpdation = inngest.createFunction(
    {id: "update-user-from-clerk"},
    {event: "clerk/user.updated"},
    async({event}) => {
        const {data} = event
        await Prisma.user.update({
            where: {
                id: data.id
            },
            data: {
                email: data?.email_addresses[0]?.email_addresses,
                name: data?.first_name + " " + data?.last_name,
                image: data?.image_url,

            }
        })

    }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];