<!--

# Clean Architecture in next js

/app
  /(auth)
  # server actions
  actions.ts

/assets

/di
  /modules
  container.ts
  types.ts

/drizzle or prisma

/src
  /application
    /repositories (interface)
      # just signature of a function for interacting with db
      todos.repository.interface.ts
      users.repository.interface.ts

    /services (interface)
      auth.service.interface.ts

    # specific business logic/action ex: createPost()
    # service and repository =: inject here
    /use-cases (implementation)
      create-todo.use-case.ts

  /entities
    /errors
      auth.ts

    /models
      # uses zod to create Entity
      todo.ts
      cookie.ts

  /infrastructures
    # work with a db
    /repositories (implementation)
      todos.repository.ts
      # just mock implementation
      todos.repository.mock.ts
      users.repository.ts

    # any repeated action through use cases that maybe works with an external service lie: sendEmailService
    /services (implementation)
      auth.service.ts

  /interface-adapters
    # be called from a api route (http-request) or inside server-action
    /controllers
      /auth
      /todos
        create-todo.controller.ts
        get-todos-for-user.controller.ts
        toggle-todo.controller.ts

/tests
  # only testing use-cases and controllers: which holds the main logic
  /unit
    /application
      /use-cases
        /auth
          sign-in.use-case.test.ts

        /todos
          create-todo.use-case.test.ts

    /interface-adapters
      /controllers
        /auth
          sign-in.controller.test.ts

=====================
# TodoEntity

# Todo data
  # id
  # todo
  # completed
  # userId

# todo action
  # toggleCompleted

# zod has this insert thing that let you only get the data you want to insert in your type: like: in createTodo() we don't want to insert id

===================

#repository implementation

@injectable()
export class TodosRepository implements ITodosRepository {

  // create todo with interacting with a certain database
  async createTodo(todo: TodoEntity): Promise<TodoEntity> {
    // connect to prisma and create
    // return any value
  }
}

====================

# server action or client-side =: calls the controller.

===================

# service vs use-case

Service: Provides reusable logic, often to interact with external systems (like APIs, databases, email providers) or handle shared tasks within the app. Since they’re more general-purpose, services can be used across multiple use-cases.

Use-Case: Defines a specific operation or workflow that represents a distinct action within the app, like createPost, registerUser, or checkoutOrder. Each use-case encapsulates the business logic necessary to fulfill that specific action, often using one or more services to complete the task.

So in your application:

Use-cases orchestrate business logic by coordinating various components (like repositories and services).
Services provide focused functionality that multiple use-cases may rely on, keeping the logic DRY and maintainable.

# so: maybe you want to change the email service later so inject it into  use-case

private emailService: EmailService

-->

<!--

# clean architecture flow

# framework and drivers (nextJs)
  # (maybe a middleware => route => controller)
  => interface-adapter (controller, presenters)
      # check for auth
      # input validation with zod
      # controller throws an error
        - error can be handled in api-route or server action to show some ui for error. (Entity-error)

      # ** so some services might be called inside controller
      # di
        # returns service to check for authenticated
      const authenticationService = getInjection("IAuthenticationService")

      authenticationService
        .validateSession
        .createSession
        and so on ...

      # call use-case

      # at the end of controller
      # use a presenter() to format the exact data we need for the client
      # or for example : not sending the password to client

    # at the end we call use-case createTodo()
    => use-case (interface & dependency injection)

      # INSIDE USE-CASE
        # check for authorization (role)
        # maybe there are different access-levels and each level can do only certain operations. ex: standard-user can only create 10 todos
          in create-todo.use-case.ts

      # then we use di to get the TodoRepository
      const todosRepository = getInjection("ITodosRepository")
      todosRepository.createTodo

      # you might want to use the TodoEntity class to format the data to not get the db specific data

      => repository
        # connect to db
        # if there is an error, do not throw the default database error, but throw a custom error =: cause use-case should not be dependent on the database

      => service
        # some repeated actions that maybe works with an external service lie: sendEmailService

        class AuthenticationService implements IAuthenticationService {

        }


# Entities:
  # Errors:

  # models
    # TodoEntity
      # with class or zod schema

# example of errors

# it extend the js Error
export class UnauthenticatedError extends Error {

  # we can pass a custom message and options
  constructor(message: string, options?:ErrorOptions) {
    super(message, options)
  }
}
======================
function presenter(todo: TodoEntity) {
  return {
    id: todo.id,
    todo: todo.todo,
    userId: todo.userId,
    completed: todo.completed
  }
}

======================

# DI

# container.ts

# this is a package helps with dependency injection
import { Container } from "inversify";

const ApplicationContainer = new Container({
  defaultScope: "Singleton",
});

# register services
export initializeContainer = () => {
  ApplicationContainer.load(TodosModule);
  ApplicationContainer.load(AuthenticationModule);
}

# this is used in unit test
export const destroyContainer = () => {
  ApplicationContainer.unload(TodosModule);
}

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K,

  ): DI_RETURN_TYPES[K] {
    return ApplicationContainer.get<DI_RETURN_TYPES[K]>(DI_SYMBOLS[symbol]);
  }

======================

# authenticationModule

const initializeModule = (bind: interfaces.Bind) => {
  if(process.env.NODE_ENV === "test") {
    bing<IAuthenticationService>(DI_SYMBOLS.IAuthenticationService).to(mockAuthenticationService)
  } else {
    bind<IAuthenticationService>(DI_SYMBOLS.IAuthenticationService).to(AuthenticationService);
  }
}

export const AuthenticationModule = new ContainerModule(initializeModule);

======================

# test



-->

<!--

# separate actions or controllers
into it's own file

# server-actions
create-item.action.ts
update-item.action.ts

# web can create a class for entity and put the zod validation also in the class

class TodoEntity {
  private todo: string;

  constructor() {
  }

  // any action on todo can be a method
  setTodo(todo: string) {

  }

  // zod validation
  validate() {
    const todoSchema = z.object({
      todo: z.string().min(3).max(100)
    })
  }

}

-->
