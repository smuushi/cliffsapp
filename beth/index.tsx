console.log("Hello via Bun!");

import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";

const app = new Elysia()
    .use(html())
    .get("/", ({ html } ) => html(
        <BaseHTMl>
            <body class="flex w-full h-screen justify-center items-center">

                <button 
                    class="m-10 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    hx-post="/clicked" hx-swap="outerHTML">
                        click me, brother
                </button>
                <h1>Hello World</h1>

            </body>
        </BaseHTMl>
    ))
    .post("/clicked", () => {
        return <div class="text-blue-600">
            I'm from the server lmao
        </div>
    })
    .get("/todos", () => {
        return <TodoListComponent todosArray={db} />
    })
    .listen(9999);

console.log(
    `Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);

const BaseHTMl = ({ children }: elements.Children) => `
    <!DOCTYPE html> 
    <html lang="en">

        <head>
            <title>CLIFFS APP</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://unpkg.com/htmx.org@1.9.3"></script>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>


        ${ children }


    </html>
`;

type Todo = {
    id: number;
    content: string;
    completed: boolean;
};

const db : Todo[] = [
    { id: 1, content: "learn this stack", completed: false },
    { id: 2, content: "check this off..", completed: false },
];

const TodoItemComponent = (todo : Todo) => {
    return(
        <div class="flex flex-row space-x-3">
            <p>{todo.content}</p>
            <input type="checkbox" checked={todo.completed}/>
            <button class="text-red-600">delete</button>
        </div>
    )
}

const TodoListComponent = ({ todosArray }: { todosArray: Todo[]}) => {
    return(
        <div>
            {todosArray.map((todo) => {
                return <TodoItemComponent {...todo} />
            })}
        </div>
    )
}


