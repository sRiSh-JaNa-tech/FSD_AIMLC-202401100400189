import {Request, Response} from "express";
import {User} from "../types/user";

let users : User[] = [];

export const getUsers = (req: Request, res: Response) => {
    res.json(users);
};

// Mental Model of Request 
// Request<Params, ResBody, ReqBody, Query>
`Request<
  { id: string },                // params
  {},                           // res body
  Omit<User, "id">,             // request body
  { filter: string }            // query
>`

export const createUser = (
    req : Request<{}, {}, Omit<User, "id">>,
    res : Response
) => {
    const {name , age} = req.body;

    const newUser: User = {
        id : users.length + 1,
        name,
        age
    };
    users.push(newUser);
    res.status(201).json({message : "User created",user : newUser});
}
