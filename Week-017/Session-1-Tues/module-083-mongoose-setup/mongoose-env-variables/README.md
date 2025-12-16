## how does the .env work?

1. you add it to your .gitignore on git, so it isn't included in your codebase, only locally

2. you will typically start with an env.example to help yourself, and other devs setup your env file quickly, this won't be gitignored

3. you need a way in your codebase to inject your environment variables so that your code works, i.e. (dotenv package for node)