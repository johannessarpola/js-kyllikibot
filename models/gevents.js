module.exports.createAttendee = (displayName, email = '', comment = '', id = '', optional = false, additionalGuests = null) => {
	return {
		id:  id,
		email: email,
		displayName: displayName,
		comment : comment,
		optional : optional,
		additionalGuests : additionalGuests,
	};
};

module.exports.createOrganizer = (id, email, displayName) => {
	return {
		id: id,
		email: email,
		displayName: displayName,
	};
};

module.exports.createTime = (datetime, timezone = '') => {
	const time = {
		dateTime : datetime.toJSON(),
		timeZone : 'UTC',
	};
	/* if(timezone.length == 0) {
    time.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  else {
    time.timeZone = timezone;
  }*/
	return time;
};

module.exports.createReminders = (reminder = []) => {
	return {
		useDefault: false,
		overrides: reminder,
	};
};

module.exports.createEmailReminder = (minutes) => {
	return { method: 'email', minutes: minutes };
};

module.exports.createPopupReminder = (minutes) => {
	return { method: 'popup', minutes: minutes };
};

module.exports.addPopupReminder = (reminders, minutes) => {
	const reminder = this.createPopupReminder(minutes);
	if(reminders.overrides) {
		reminders.overrides.push(reminder);
	}
	else {
		reminders.overrides = [reminder];
	}
};

module.exports.addEmailReminder = (reminders, minutes) => {
	const reminder = this.createEmailReminder(minutes);
	if(reminders.overrides) {
		reminders.overrides.push(reminder);
	}
	else {
		reminders.overrides = [reminder];
	}
};

module.exports.createEvent = (summary, description, start, end, attendees = [], location = '', reminders = {}) => {
	return {
		summary : summary,
		description : description,
		start : start,
		end : end,
		attendees : attendees,
		location : location,
		reminders : reminders,
	};
};


module.exports.createSimpleEvent = (summary, start, end, description = '') => {
	return {
		summary : summary,
		description : description,
		start : start,
		end : end,
	};
};