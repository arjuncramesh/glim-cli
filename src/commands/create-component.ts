import * as fs from "fs";
import { componentTemplate, styleTemplate } from "../template/component";
import { openai } from "../openai/config";
/**
 * create a new component in glim project
 * @param compname
 */
const createComponent = async (compname: string) => {
  console.log("creating component");
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Hello world",
    });
    console.log(completion.data.choices[0].text);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
  // const component = componentTemplate(compname);
  // const style = styleTemplate(compname);
  // fs.mkdir(`./src/components/${compname}`, (err) => {
  //   if (!err) {
  //     fs.writeFile(
  //       `./src/components/${compname}/${compname}.component.tsx`,
  //       component,
  //       (err) => {
  //         !err &&
  //           console.log(
  //             `Created ${compname}.component.tsx in src/components/${compname}`
  //           );
  //       }
  //     );
  //     fs.writeFile(
  //       `./src/components/${compname}/${compname}.style.ts`,
  //       style,
  //       (err) => {
  //         !err &&
  //           console.log(
  //             `Created ${compname}.style.ts in src/components/${compname}`
  //           );
  //       }
  //     );
  //     const newline = `export { ${compname} } from './image/${compname}'`;
  //     fs.appendFile("./src/components/index.ts", newline + "\r\n", (err) => {
  //       if (err) {
  //         console.log("Unable to update index.ts file");
  //       }
  //     });
  //   } else {
  //     err?.code === "EEXIST" &&
  //       console.log(`Error: Component ${compname} already exist`);
  //   }
  // });
};
export { createComponent };
