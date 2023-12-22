import { ValidationError } from 'class-validator';
import { formatDistance, formatDuration, intervalToDuration } from 'date-fns';
import { format } from 'date-fns/format';
import * as dateLocales from 'date-fns/locale';

import { Play, Rating, Ride, RideDto, Run, Timeline } from './gql';

export const LOCAL_STORAGE_ACCESS_TOKEN_KEY = 'access-token';
export const LOCAL_STORAGE_CURRENT_USER_ID = 'current-user-id';
export const LOCAL_STORAGE_DARK_MODE = 'dark-mode';

export const initDarkMode = () => {
  const darkMode = isDarkMode();
  switchDarkMode(darkMode);
};

export const switchDarkMode = (darkMode?: boolean) => {
  darkMode = darkMode != null ? darkMode : isDarkMode();
  if (darkMode) {
    document.body.classList.add('dark');
    localStorage.setItem(LOCAL_STORAGE_DARK_MODE, '1');
  } else {
    document.body.classList.remove('dark');
    localStorage.setItem(LOCAL_STORAGE_DARK_MODE, '0');
  }
  return darkMode;
};

export const isDarkMode = () => {
  return !!+localStorage.getItem(LOCAL_STORAGE_DARK_MODE)!;
};

export const dataSource = () => ({
  endpoint: '/graphql',
  fetchParams: {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(
        LOCAL_STORAGE_ACCESS_TOKEN_KEY,
      )}`,
    },
  },
});

export const userId = () => {
  return +localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_ID)!;
};

export const logout = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  document.location = '/auth/sign-in';
};

export const transformValidationErrors = (
  errors: ValidationError[],
  paths: string[] = [],
) => {
  let result = {};

  for (const error of errors) {
    if (error.children?.length) {
      result = {
        ...result,
        ...transformValidationErrors(
          error.children,
          paths.concat([error.property]),
        ),
      };
    }
    if (error.constraints) {
      const constraints = Object.entries(error.constraints!);

      for (const constraint of constraints) {
        result[[...paths, error.property].join('.')] = {
          type: constraint[0],
          message: constraint[1],
        };
      }
    }
  }
  return result;
};

export const playDuration = (locale: string, ...timelines: Timeline[]) => {
  return formatDistance(
    0,
    Math.max(...timelines!.map((t) => ridesOverallLength(t.rides!))),
    {
      locale: dateLocales[locale],
    },
  );
};

export const formatTimelineTick = (value) => {
  const duration = intervalToDuration({ start: 0, end: value });
  const zeroPad = (num) => String(num).padStart(2, '0');

  return formatDuration(duration, {
    format: ['hours', 'minutes', 'seconds'],
    zero: true,
    delimiter: ':',
    locale: {
      formatDistance: (_token, count) => zeroPad(count),
    },
  });
};

export const formatTimelineRemainingTime = (
  length,
  runTime,
  locale: string,
) => {
  const duration = intervalToDuration({ start: runTime, end: length });

  return formatDuration(duration, {
    format: ['hours', 'minutes', 'seconds'],
    locale: dateLocales[locale],
  });
};

export const formatDate = (date, locale) => {
  return format(new Date(date), 'P', { locale: dateLocales[locale] });
};

export const formatTime = (date, locale) => {
  return format(new Date(date), 'HH:mm', { locale: dateLocales[locale] });
};

export const formatDateTime = (date, locale) => {
  return format(new Date(date), 'dd/LL/yyyy HH:mm', {
    locale: dateLocales[locale],
  });
};

export const ridesOverallLength = (rides) =>
  rides!.map((ride) => ride.length!).reduce((agg, val) => agg + val, 0);

export const ridesToIntervals = (rides: (Ride | RideDto)[]) => {
  if (rides.length === 0) {
    return [];
  }
  return [
    0,
    ...rides.map((r, i) => {
      return r.length + ridesOverallLength(rides.slice(0, i));
    }),
  ];
};

export const intervalsToRides = (
  intervals: number[],
  oldRides: (Ride | RideDto)[],
) => {
  const rides = [...oldRides];
  oldRides.forEach((r, i) => {
    r.length = intervals[i + 1] - ridesOverallLength(rides.slice(0, i));
  });
  return rides;
};

export const activeRide = (rides: (Ride | RideDto)[], runTime: number) => {
  return rides.find((r, i) => {
    const offset = ridesOverallLength(rides.slice(0, i));
    return runTime >= offset && runTime < r.length + offset;
  });
};

export const overallRating = (...runs: Run[]) => {
  return runs.length > 0
    ? runs.reduce((a, run) => {
        return (
          a +
          (run.ratings!.length > 0
            ? run.ratings!.reduce((b, rating) => {
                return b + rating.score!;
              }, 0) / run.ratings!.length
            : 0)
        );
      }, 0) / runs.length
    : undefined;
};

export const overallOrgasms = (...ratings: Rating[]) => {
  return ratings.reduce((agg, val) => agg + val.orgasms!, 0);
};

export const flatRatings = (...plays: Play[]) => {
  return plays.reduce((a, p) => {
    return [
      ...a,
      ...p.runs!.reduce((b, r) => {
        return [
          ...b,
          ...r.ratings!.map((rating) => ({
            ...rating,
            run: { ...r, play: { ...p } },
          })),
        ];
      }, [] as Array<Rating>),
    ];
  }, [] as Array<Rating>);
};

export const enum RouteNames {
  MAIN = 'main',
  SETTINGS = 'settings',
  USERS = 'users',
  NEW_USER = 'newUser',
  EDIT_USER = 'editUser',
  VIEW_USER = 'viewUser',
  TOYS = 'toys',
  EDIT_TOY = 'editToy',
  VIEW_TOY = 'viewToy',
  PLAYS = 'plays',
  NEW_PLAY = 'newPlay',
  EDIT_PLAY = 'editPlay',
  VIEW_PLAY = 'viewPlay',
}
