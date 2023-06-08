import inquirer from "inquirer";
import { checkIfInsideProject } from "../../utils/file-system";
import { toPascalCase } from "../../utils/namevalidator";
import { createComponent } from "../create-component";
import { createScreen } from "../create-screen";
import { createStore } from "../create-store";
import {
  multiselect,
  text,
  isCancel,
  cancel,
  intro,
  outro,
} from "@clack/prompts";

const appnameRegex = new RegExp(/^[a-zA-Z]+$/);

/**
 * check which module is generated by user for generator
 */
const selectModule = async () => {
  intro("");
  await checkIfInsideProject();

  const moduleType = await multiselect({
    message: "Choose what you want to create",
    options: [
      { value: "component", label: "Component", hint: "Powered by AI" },
      { value: "screen", label: "Screen" },
    ],
    required: true,
  });
  if (isCancel(moduleType)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  const modulename = await text({
    message: `Enter the ${moduleType} name`,
    placeholder: "Button / Login screen etc",
  });
  if (isCancel(modulename)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }
  console.log(moduleType);
  // use the function based on the user choice
  if (moduleType[0] === "component") {
    createComponent(toPascalCase(modulename));
  } else if (moduleType[0] === "screen") {
    createScreen(toPascalCase(modulename));
  } else if (moduleType[0] === "store") {
    createStore(modulename);
  } else {
    process.exit(1);
  }
  outro("");
};
export { selectModule };