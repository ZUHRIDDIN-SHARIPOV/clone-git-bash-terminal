const body = document.querySelector("body");
const form = document.querySelector("form");
const input = document.querySelector("input");
const terminalBlock = document.querySelector(".terminal__block");
const terminalCommand = document.querySelector(".terminal__command");

input.focus();

body.addEventListener("click", () => input.focus());

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const terminalValue = input.value.toLowerCase();
  const gitHubUrl = "https://github.com/";
  const gitHubRepositorieUrl = input.value.slice(29, -4);
  const gitHubRepositorieDownloadPath = "/archive/refs/heads/main.zip";

  const createCommandUi = (
    command = "git clone",
    message = `git clone succeeded ${gitHubUrl}${gitHubRepositorieUrl}.git`
  ) => {
    const list = document.createElement("ul");
    list.classList.add("terminal__form-list");
    const item1 = document.createElement("li");
    item1.classList.add("terminal__form-item");
    item1.textContent = "Dell@hp";
    list.appendChild(item1);
    const item2 = document.createElement("li");
    item2.classList.add("terminal__form-item");
    item2.textContent = "MINGW64";
    list.appendChild(item2);
    const item3 = document.createElement("li");
    item3.classList.add("terminal__form-item");
    item3.textContent = "~";
    list.appendChild(item3);
    terminalCommand.append(list);
    const contentList = document.createElement("ul");
    contentList.classList.add("terminal__command-list");
    const contentItem1 = document.createElement("li");
    contentItem1.classList.add("terminal__command-item");
    contentItem1.textContent = "$";
    contentList.appendChild(contentItem1);
    const contentItem2 = document.createElement("li");
    contentItem2.classList.add("terminal__command-item");
    contentItem2.textContent = command;
    contentList.appendChild(contentItem2);
    terminalCommand.append(contentList);
    const commandTextFull = document.createElement("p");
    commandTextFull.classList.add("terminal__command-text");
    commandTextFull.textContent = message;
    terminalCommand.append(commandTextFull);
  };

  if (terminalValue) {
    if (terminalValue.includes("git clone")) {
      if (terminalValue.includes(gitHubUrl)) {
        const fileUploader = document.createElement("a");
        fileUploader.href = `${gitHubUrl}${gitHubRepositorieUrl}${gitHubRepositorieDownloadPath}`;
        fileUploader.download = true;
        terminalBlock.appendChild(fileUploader);
        fileUploader.click();
        terminalBlock.removeChild(fileUploader);
        createCommandUi();
        form.reset();
      } else {
        createCommandUi("error", "GitHub repository https link failed");
        form.reset();
      }
    } else if (terminalValue.includes("node")) {
      createCommandUi("node", "Welcome to Node.js v18.16.0.");
      form.reset();
    } else if (terminalValue.includes("clear")) {
      terminalCommand.innerHTML = "";
      form.reset();
    } else {
      createCommandUi("error", "bash: command not found");
      form.reset();
    }
  } else createCommandUi("", "");
});
