function scheduleHtmlParser(html) {
  course = [];
  const $ = cheerio.load(html, { decodeEntities: false });
  weekday = 0;
  cycles = 0;
  $("td>div").each(function () {
    if ($(this).find(".courseName").text()) {
      $(this)
        .find(".week-day-box")
        .each(function () {
          let name = $(this).find(".courseName").text();
          let teacher = $(this).find(".instructorName").text();
          let raw_weeks = $(this)
            .find(":nth-child(4)")
            .find(":first-child")
            .text();
          let raw_sections = $(this)
            .find(":nth-child(4)")
            .find(":last-child")
            .text();
          let position = $(this).find(":nth-child(5)").text();
          let day = weekday;
          sections = handleSecions(raw_sections);
          weeks = handleWeeks(raw_weeks);
          var obj = {
            name,
            position,
            teacher,
            weeks,
            day,
            sections,
          };
          course.push(obj);
        });
    }
    weekday++;
    weekday = weekday > 7 ? 0 : weekday;
  });
  // 作息时间：
  var classTime = [
    {
      section: 1,
      startTime: "08:30",
      endTime: "09:15",
    },
    {
      section: 2,
      startTime: "09:25",
      endTime: "10:10",
    },
    {
      section: 3,
      startTime: "10:30",
      endTime: "11:15",
    },
    {
      section: 4,
      startTime: "11:25",
      endTime: "12:10",
    },
    {
      section: 5,
      startTime: "13:30",
      endTime: "14:15",
    },
    {
      section: 6,
      startTime: "14:25",
      endTime: "15:10",
    },
    {
      section: 7,
      startTime: "15:20",
      endTime: "16:05",
    },
    {
      section: 8,
      startTime: "16:25",
      endTime: "17:10",
    },
    {
      section: 9,
      startTime: "17:20",
      endTime: "18:05",
    },
    {
      section: 10,
      startTime: "19:00",
      endTime: "19:45",
    },
    {
      section: 11,
      startTime: "19:55",
      endTime: "20:40",
    },
    {
      section: 12,
      startTime: "20:50",
      endTime: "21:35",
    },
  ];
  return { courseInfos: course, sectionTimes: classTime };
}
// 将原课表上每节课在哪一周上的信息处理后返回列表值
function handleWeeks(raw_weeks) {
  weeks = [];
  weeks1 = raw_weeks
    .replace("[", "")
    .replace("]", "")
    .replace("周", "")
    .replace(" ", "")
    .split(",");
  weeks1.forEach((e) => {
    if (e.length == 1 || e.length == 2) {
      weeks.push(Number(e));
    } else {
      let lst = e.split("-");
      i = Number(lst[0]);
      end = Number(lst[1]);
      while (i <= end) {
        weeks.push(i);
        i++;
      }
    }
  });
  return weeks;
}
// 将原课表上每节课上的节数信息处理后返回相应对象
function handleSecions(raw_sections) {
  sections = [];
  sections1 = raw_sections
    .replace("[", "")
    .replace("]", "")
    .replace("节", "")
    .trim()
    .split("-");
  i = Number(sections1[0]);
  end = Number(sections1[1]);
  while (i <= end) {
    sections.push({
      section: i,
    });
    i++;
  }
  return sections;
}
