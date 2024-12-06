for n in range(3):
    n = n+1
    with open(f"diagnosisScenario{n}-GPT-4o.txt", "r") as f:
        gpt4o = f.read()
    with open(f"diagnosisScenario{n}-GPT-o1.txt", "r") as f:
        gpto1 = f.read()
    with open(f"diagnosisScenario{n}-Llama-3.1-405b.txt", "r") as f:
        llama = f.read()
    with open("a.txt", "a") as f:
        f.write(f"SCENARIO {n}")
        f.write(f"LLM 1:\n{gpt4o}")
        f.write(f"\nLLM 2:\n{gpto1}")
        f.write(f"\nLLM 3:\n{llama}")
        f.write(f"\n---\n")