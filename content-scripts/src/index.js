import {
  injectOverrideFunctions,
  reverseDateDirection,
  currentAccountPage,
  addSortTableActions
} from "./modules/initialize";
import { injectAllChanges, userPreferences } from "./modules/options/all";
import constructNewData from "./modules/utilities/constructNewData";
import { getStorage } from "./modules/utilities/storage";
import { rememberLogin } from "./modules/login";
import { replaceIcons } from "./modules/icons";
import { teacherPage } from "./pages/teacher_page";
import { classPage } from "./pages/class_page";
import { improveSchedule } from "./modules/schedule";
import { changeCourseCards, changeProfileRow } from "./pages/profile_page";
import { courseUnitPage } from "./pages/course_unit_page";
import { fixPagination } from "./modules/pagination";
import { changeLayout } from "./modules/layout";

/*--
- Docs: https://developer.chrome.com/docs/extensions/reference/storage/#synchronous-response-to-storage-updates
- Listen to Chrome Storage changes
- Inject styles in respond to changes
--*/
chrome.storage.onChanged.addListener((changes) => {
  const newChangesData = constructNewData(changes);
  rememberLogin();
  injectAllChanges(newChangesData);
});

/*--
- Initializing function, runs once at start
- Get Chrome Storage and inject respective styles
--*/

const functionsToExecute = [
  { name: "changeLayout", func: changeLayout },
  { name: "reverseDateDirection", func: reverseDateDirection },
  { name: "currentAccountPage", func: currentAccountPage },
  { name: "addSortTableActions", func: addSortTableActions },
  { name: "replaceIcons", func: replaceIcons },
  { name: "improveSchedule", func: improveSchedule },
  { name: "changeProfileRow", func: changeProfileRow },
  { name: "changeCourseCards", func: changeCourseCards },
  { name: "fixPagination", func: fixPagination },
  { name: "teacherPage", func: teacherPage },
  { name: "classPage", func: classPage },
  { name: "courseUnitPage", func: courseUnitPage },
  { name: "injectOverrideFunctions", func: injectOverrideFunctions },
]

const init = async () => {

  // // Watch for resize events
  // addResizeListener();

  // // Inject user preferences
  const data = await getStorage(userPreferences);
  injectAllChanges(data);
  rememberLogin(data);

  functionsToExecute.forEach(f => {
    try {
      f.func();
    } catch (error) {
      console.error(`Error running ${f.name} init function!\n`)
      console.error(error);
    }
  });
};

init();
