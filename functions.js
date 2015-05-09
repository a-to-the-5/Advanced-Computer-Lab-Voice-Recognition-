function getTrips(from, to) {
	var size = 0;
	for (i in trips)
		if(trips[i].from == from && trips[i].to == to)
			size++;
	res = new Array(size);
	
	var j = 0;
	for (i in trips)
		if(trips[i].from == from && trips[i].to == to)
			res[j++] = trips[i];
	return res;
}

function getTrip(tripno) {
	if(tripno >= trips.length + 100 || tripno < 100)
		return null;
	return trips[tripno - 100];
}

function distance(departure, time, trip) {
	time %= 24*60;
	return departure?Math.abs(trip.departure - time) : Math.abs(trip.arrival - time);
}

function closestMatch(from, to, departure, time) {
	var trips = getTrips(from, to);
	if (trips.length == 0)
		return null;
	var ires = 0;
	var min = distance(departure, time, trips[0])
	for (i in trips) {
		var dist = distance(departure, time, trips[i])
		if(dist < min) {
			ires = i;
			min = dist;
		}
	}
	
	return trips[ires];
}

function getPrice(trip, fclass) {
	var duration = (trip.arrival - trip.departure);
	return fclass?duration*50 : duration*20;
}

function sayPrice(price) {
	var pounds = Math.floor(price/100);
	var piasters = price%100;
	var res = '' + pounds + ' pounds';
	if(piasters > 0)
		res += ' and ' + piasters + ' piasters';
	return res;
}

function minutesToTime(minutes) {
	var hours = Math.floor(minutes/60);
//	if(hours < 10)
//		hours = '0'+hours;
	var mins = minutes%60;
	if(mins < 10)
		mins = '0'+mins;
	return ''+hours+':'+mins;
}

function synthToMinutes(time) {
	res = 0;
	if(time.charAt(time.length - 1) == 'p')
		res += 12*60;
	res += Number(time.substring(0,2))*60;
	res += Number(time.substring(2,4));
	return res;
}

function minutesToDuration(minutes) {
	var hours = Math.floor(minutes/60);
	var mins = minutes%60;
	var res = '' + hours + ' hours';
	res += ' and ' + mins + ' minutes';
	return res;
}

function calculateCost(trip, nseats, fclass) {
	return getPrice(trip, fclass)*nseats;
}

function sayTrip(trip) {
	return 'Trip number <say-as interpret-as="number" format="digits">'+trip.id+'</say-as>, departs from '+trip.from+' at <say-as interpret-as="time" format="hm">'+minutesToTime(trip.departure%(24*60))+'</say-as> and arrives at '+trip.to+
	' at <say-as interpret-as="time" format="hm">'+minutesToTime(trip.arrival%(24*60))+'</say-as>. Traveling duration is '+minutesToDuration(trip.arrival - trip.departure)+'. '+
	'Seat cost in first class is '+sayPrice(getPrice(trip,true))+'. Seat cost in second class is '+sayPrice(getPrice(trip,false));
}

