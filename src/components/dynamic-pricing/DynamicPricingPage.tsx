import React from 'react';
import Timeline, {TimelineGroupBase, TimelineItemBase} from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import {parseDateTime} from 'utils/dateUtils';
import './DynamicPricingPage.css';
import { splitLines } from "utils/stringUtils";

interface Props {}

export const DynamicPricingPage: React.FC<Props> = ({}) => {
  const [groups, setGroups] = React.useState<TimelineGroupBase[]>([]);
  const [items, setItems] = React.useState<TimelineItemBase<number>[]>([]);

  const now = +new Date();

  React.useEffect(() => {
    const onDragover = (e: DragEvent): void => {
      e.preventDefault();
    };

    const onDrop = (e: DragEvent): void => {
      e.preventDefault();

      const files = [...e.dataTransfer.files];
      const ycRecordsFile = files.find((x) => x.name === 'Записи.csv');
      const ycSchedulesFile = files.find((x) => x.name === 'Занятость.csv');

      if (ycRecordsFile && ycSchedulesFile) {
        ycSchedulesFile.text().then((ycSchedulesText) => {
          ycRecordsFile.text().then((ycRecordsText) => {
            const parsedSchedules = parseSchedulesCsv(ycSchedulesText);
            const parsedRecords = parseRecordsCsv(ycRecordsText);
            setGroups(parsedSchedules.groups);
            setItems([...parsedSchedules.items, ...parsedRecords.items]);
          });
        });
      }
    };

    window.document.addEventListener('drop', onDrop);
    window.document.addEventListener('dragover', onDragover);
    return () => {
      window.document.removeEventListener('drop', onDrop);
      window.document.removeEventListener('dragover', onDragover);
    };
  }, []);

  return (
    <div className={'App_root'}>
      <Timeline
        key={Date.now()}
        groups={groups}
        items={items}
        stackItems={false}
        canMove={false}
        canResize={false}
        itemTouchSendsClick={false}
        defaultTimeStart={new Date(now - 43200000)}
        defaultTimeEnd={new Date(now + 43200000)}
      />
    </div>
  );
};

function parseSchedulesCsv(csv: string): {
  readonly groups: TimelineGroupBase[];
  readonly items: TimelineItemBase<number>[];
} {
  const preGroups: Record<string, string> = {};
  const items: TimelineItemBase<number>[] = [];

  let index = 0;
  let skipOnce = true;
  for (const line of splitLines(csv)) {
    if (skipOnce) {
      skipOnce = false;
      continue;
    }

    const parts = line.split(';');
    const staffId = +parts[0];
    const name = parts[1];
    const startDate = parseDateTime(parts[2]);
    const endDate = parseDateTime(parts[3]);

    preGroups[staffId] = name;

    items.push({
      id: ++index,
      group: staffId,
      title: 'Слот',
      start_time: startDate * 1000,
      end_time: endDate * 1000,
      itemProps: {
        style: {
          color: 'black',
          background: '#ffea99'
        }
      }
    });
  }

  const groups: TimelineGroupBase[] = [];
  for (const key in preGroups) {
    groups.push({
      id: key,
      title: preGroups[key],
    });
  }

  return {items, groups};
}

function parseRecordsCsv(csv: string): {
  readonly items: TimelineItemBase<number>[];
} {
  const items: TimelineItemBase<number>[] = [];

  let skipOnce = true;
  for (const line of splitLines(csv)) {
    if (skipOnce) {
      skipOnce = false;
      continue;
    }

    const parts = line.split(';');
    const recordId = +parts[0];
    const staffId = +parts[1];
    // const name = parts[2];
    // const specialization = parts[3];
    const dateTime = parseDateTime(parts[4]);
    // const date = parseDate(parts[5]);
    // const time = parseTime(parts[6]);
    const seanceLength = +parts[7];
    // const paidFull = parts[8];
    // const serviceCost = parts[9];
    const serviceName = parts[10];

    items.push({
      id: recordId,
      group: staffId,
      title: serviceName,
      start_time: dateTime * 1000,
      end_time: (dateTime + seanceLength) * 1000,
    });
  }

  return {items};
}
