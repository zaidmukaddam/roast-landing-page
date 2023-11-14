# Roast Landing Page 

⚠️ warning: your landing page designers may not like this project

this is a site that use GPT-4 Vision to generate roasts for you, and then streams them to your browser. It's a fun little project that I made to learn more about GPT-4 Vision, and to see how I could use it in a real world application.

### Setup

1. You'll need an OpenAI API key, which you can get [here](https://platform.openai.com/).
2. Add those two keys to a new file named `.env.local` in the root of the project, like so:

```
OPENAI_API_KEY=sk-1234567890
```

3. That's it! You're ready to go! 🚀

If you look around, you'll see you can update the default image and text, and even prompts used in our edge function that streams roasts!

### Run it locally

1. Open the terminal
2. Run `npm install` to grab the necceary packages
3. Hit `npm run dev` to start your server on `http://localhost:3000`

Having trouble? Make sure you have node installed, and that you're running the latest version of npm. Otherwise open an issue and I'll help ya out!

